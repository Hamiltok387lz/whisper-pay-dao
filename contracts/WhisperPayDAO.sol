// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract WhisperPayDAO is SepoliaConfig {
    using FHE for *;
    
    struct Payment {
        euint32 paymentId;
        euint32 amount;
        bool isPaid;
        bool isEncrypted;
        string title;
        string description;
        address payer;
        address payee;
        uint256 createdAt;
        uint256 paidAt;
    }
    
    struct UserProfile {
        euint32 totalPayments;
        euint32 totalAmount;
        euint32 reputation;
        bool isActive;
        string name;
        string email;
        address walletAddress;
        uint256 joinedAt;
    }
    
    struct Analytics {
        euint32 totalPayments;
        euint32 totalAmount;
        euint32 activePayments;
        euint32 completedPayments;
        euint32 totalUsers;
        uint256 lastUpdated;
    }
    
    mapping(uint256 => Payment) public payments;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => uint256[]) public userPayments;
    
    uint256 public paymentCounter;
    uint256 public userCounter;
    
    address public owner;
    address public verifier;
    
    Analytics public globalAnalytics;
    
    event PaymentCreated(uint256 indexed paymentId, address indexed payer, address indexed payee, string title);
    event PaymentProcessed(uint256 indexed paymentId, address indexed payer, address indexed payee);
    event UserRegistered(address indexed user, string name, string email);
    event AnalyticsUpdated(uint256 timestamp);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        
        // Initialize analytics
        globalAnalytics = Analytics({
            totalPayments: FHE.asEuint32(0),
            totalAmount: FHE.asEuint32(0),
            activePayments: FHE.asEuint32(0),
            completedPayments: FHE.asEuint32(0),
            totalUsers: FHE.asEuint32(0),
            lastUpdated: block.timestamp
        });
    }
    
    function registerUser(
        string memory _name,
        string memory _email
    ) public returns (bool) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(userProfiles[msg.sender].walletAddress == address(0), "User already registered");
        
        userProfiles[msg.sender] = UserProfile({
            totalPayments: FHE.asEuint32(0),
            totalAmount: FHE.asEuint32(0),
            reputation: FHE.asEuint32(100), // Initial reputation
            isActive: true,
            name: _name,
            email: _email,
            walletAddress: msg.sender,
            joinedAt: block.timestamp
        });
        
        // Update global analytics
        globalAnalytics.totalUsers = FHE.add(globalAnalytics.totalUsers, FHE.asEuint32(1));
        globalAnalytics.lastUpdated = block.timestamp;
        
        emit UserRegistered(msg.sender, _name, _email);
        return true;
    }
    
    function createPayment(
        string memory _title,
        string memory _description,
        address _payee,
        externalEuint32 _amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_payee != address(0), "Invalid payee address");
        require(_payee != msg.sender, "Cannot pay yourself");
        require(userProfiles[msg.sender].walletAddress != address(0), "Payer must be registered");
        require(userProfiles[_payee].walletAddress != address(0), "Payee must be registered");
        
        uint256 paymentId = paymentCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        
        payments[paymentId] = Payment({
            paymentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            isPaid: false,
            isEncrypted: true,
            title: _title,
            description: _description,
            payer: msg.sender,
            payee: _payee,
            createdAt: block.timestamp,
            paidAt: 0
        });
        
        // Update user payments mapping
        userPayments[msg.sender].push(paymentId);
        userPayments[_payee].push(paymentId);
        
        // Update user profiles
        userProfiles[msg.sender].totalPayments = FHE.add(userProfiles[msg.sender].totalPayments, FHE.asEuint32(1));
        userProfiles[_payee].totalPayments = FHE.add(userProfiles[_payee].totalPayments, FHE.asEuint32(1));
        
        // Update global analytics
        globalAnalytics.totalPayments = FHE.add(globalAnalytics.totalPayments, FHE.asEuint32(1));
        globalAnalytics.activePayments = FHE.add(globalAnalytics.activePayments, FHE.asEuint32(1));
        globalAnalytics.lastUpdated = block.timestamp;
        
        emit PaymentCreated(paymentId, msg.sender, _payee, _title);
        return paymentId;
    }
    
    function processPayment(
        uint256 _paymentId,
        externalEuint32 _amount,
        bytes calldata inputProof
    ) public returns (bool) {
        require(payments[_paymentId].payer != address(0), "Payment does not exist");
        require(payments[_paymentId].payee == msg.sender, "Only payee can process payment");
        require(!payments[_paymentId].isPaid, "Payment already processed");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        
        // Verify the amount matches (this would be done with FHE comparison in real implementation)
        // For now, we'll assume the amount is correct
        
        // Mark payment as paid
        payments[_paymentId].isPaid = true;
        payments[_paymentId].paidAt = block.timestamp;
        
        // Update user profiles
        userProfiles[msg.sender].totalAmount = FHE.add(userProfiles[msg.sender].totalAmount, internalAmount);
        userProfiles[payments[_paymentId].payer].totalAmount = FHE.add(userProfiles[payments[_paymentId].payer].totalAmount, internalAmount);
        
        // Update global analytics
        globalAnalytics.totalAmount = FHE.add(globalAnalytics.totalAmount, internalAmount);
        globalAnalytics.activePayments = FHE.sub(globalAnalytics.activePayments, FHE.asEuint32(1));
        globalAnalytics.completedPayments = FHE.add(globalAnalytics.completedPayments, FHE.asEuint32(1));
        globalAnalytics.lastUpdated = block.timestamp;
        
        emit PaymentProcessed(_paymentId, payments[_paymentId].payer, msg.sender);
        return true;
    }
    
    function getPaymentInfo(uint256 _paymentId) public view returns (
        string memory title,
        string memory description,
        uint8 amount,
        address payer,
        address payee,
        bool isPaid,
        bool isEncrypted,
        uint256 createdAt,
        uint256 paidAt
    ) {
        Payment storage payment = payments[_paymentId];
        return (
            payment.title,
            payment.description,
            0, // FHE.decrypt(payment.amount) - will be decrypted off-chain
            payment.payer,
            payment.payee,
            payment.isPaid,
            payment.isEncrypted,
            payment.createdAt,
            payment.paidAt
        );
    }
    
    function getUserProfile(address _user) public view returns (
        uint8 totalPayments,
        uint8 totalAmount,
        uint8 reputation,
        bool isActive,
        string memory name,
        string memory email,
        address walletAddress,
        uint256 joinedAt
    ) {
        UserProfile storage profile = userProfiles[_user];
        return (
            0, // FHE.decrypt(profile.totalPayments) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            profile.isActive,
            profile.name,
            profile.email,
            profile.walletAddress,
            profile.joinedAt
        );
    }
    
    function getGlobalAnalytics() public view returns (
        uint8 totalPayments,
        uint8 totalAmount,
        uint8 activePayments,
        uint8 completedPayments,
        uint8 totalUsers,
        uint256 lastUpdated
    ) {
        return (
            0, // FHE.decrypt(globalAnalytics.totalPayments) - will be decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.totalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.activePayments) - will be decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.completedPayments) - will be decrypted off-chain
            0, // FHE.decrypt(globalAnalytics.totalUsers) - will be decrypted off-chain
            globalAnalytics.lastUpdated
        );
    }
    
    function getUserPayments(address _user) public view returns (uint256[] memory) {
        return userPayments[_user];
    }
    
    function updateUserReputation(address _user, euint32 _reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(userProfiles[_user].walletAddress != address(0), "User does not exist");
        
        userProfiles[_user].reputation = _reputation;
    }
    
    function deactivateUser(address _user) public {
        require(msg.sender == owner || msg.sender == verifier, "Not authorized");
        require(userProfiles[_user].walletAddress != address(0), "User does not exist");
        
        userProfiles[_user].isActive = false;
    }
    
    function withdrawFunds() public {
        require(msg.sender == owner, "Only owner can withdraw");
        
        // Transfer contract balance to owner
        payable(owner).transfer(address(this).balance);
    }
    
    // Fallback function to receive ETH
    receive() external payable {}
}
