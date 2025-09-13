# Whisper Pay DAO

A decentralized payroll system built with FHE (Fully Homomorphic Encryption) for privacy-preserving payment processing.

## Features

- **FHE-Encrypted Payments**: All payment amounts are encrypted using Fully Homomorphic Encryption
- **Decentralized Architecture**: Built on blockchain for transparency and security
- **Privacy-Preserving**: Payment details remain encrypted while allowing computations
- **Real-time Dashboard**: Monitor payments and analytics in real-time
- **Multi-wallet Support**: Connect with various Web3 wallets

## Technologies Used

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn-ui, Tailwind CSS
- **Blockchain**: Wagmi, RainbowKit, Viem
- **Encryption**: FHE SDK for privacy-preserving computations
- **State Management**: Zustand, TanStack Query

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hamiltok387lz/whisper-pay-dao.git
cd whisper-pay-dao
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Smart Contract

The project includes a Solidity smart contract that implements FHE-encrypted payment processing. Key features:

- Encrypted payment creation and processing
- Privacy-preserving analytics
- Decentralized payment verification
- FHE-compatible data structures

## Deployment

### Vercel Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Environment Variables

Make sure to set the following environment variables:

- `VITE_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect project ID
- `VITE_CONTRACT_ADDRESS`: Deployed contract address
- `VITE_FHE_RPC_URL`: FHE network RPC URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
