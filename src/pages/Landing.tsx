import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Landing = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fully Homomorphic Encryption",
      description: "Advanced cryptographic technology ensures complete privacy of payroll data while enabling computation."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Zero-Knowledge Proofs",
      description: "Verify payments and compliance without revealing sensitive information to unauthorized parties."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-Party Computation",
      description: "Enable secure collaboration between multiple organizations while maintaining data privacy."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "End-to-End Privacy",
      description: "From salary calculations to payment distribution, every step maintains complete confidentiality."
    }
  ];

  const benefits = [
    "Comply with GDPR and privacy regulations",
    "Reduce data breach risks",
    "Enable confidential auditing",
    "Maintain competitive salary privacy",
    "Support remote workforce management",
    "Integrate with existing HR systems"
  ];

  const testimonials = [
    {
      company: "TechCorp Global",
      quote: "FHE Payroll transformed our payroll security. We can now process payments across multiple jurisdictions while maintaining complete privacy compliance.",
      author: "Sarah Chen, CISO"
    },
    {
      company: "Innovative Labs",
      quote: "The zero-knowledge proof system gives us confidence that sensitive salary data remains private even during audits.",
      author: "Michael Rodriguez, CFO"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-6 bg-privacy-secure/10 text-privacy-secure border-privacy-secure/20">
            <Lock className="h-3 w-3 mr-1" />
            Enterprise-Grade Privacy
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Revolutionary
            <span className="text-primary"> Private Payroll</span>
            <br />for Modern Organizations
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Leverage Fully Homomorphic Encryption to process payroll data with complete privacy. 
            Enable secure computations on encrypted data without ever exposing sensitive information.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            ✓ No credit card required  ✓ 14-day free trial  ✓ Enterprise support
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built on Advanced Cryptography
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform uses cutting-edge encryption technologies to ensure your payroll data remains completely private and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose FHE Payroll?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your payroll operations with privacy-first technology that doesn't compromise on functionality or compliance.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-payroll-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-privacy-secure/10 rounded-2xl p-8">
              <div className="text-center">
                <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Bank-Level Security
                </h3>
                <p className="text-muted-foreground mb-6">
                  Military-grade encryption protects your most sensitive payroll data with mathematically proven security guarantees.
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by 500+ organizations worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-foreground italic">"{testimonial.quote}"</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Revolutionize Your Payroll?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations that trust FHE Payroll for their most sensitive financial operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;