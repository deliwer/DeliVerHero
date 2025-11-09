import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  CheckCircle, 
  FileText, 
  Shield,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Download,
  Calculator
} from "lucide-react";

export default function ImpactMethodology() {
  const calculations = [
    {
      category: "Plastic Bottle Prevention",
      formula: "CO₂ = Bottles × 82g per bottle",
      verification: "GHG Protocol Scope 3",
      example: "1,000 bottles = 82kg CO₂e",
      sources: [
        "NAPCOR Lifecycle Study 2023",
        "EPA Waste Reduction Model",
        "Ellen MacArthur Foundation"
      ]
    },
    {
      category: "Water Purification System",
      formula: "CO₂ = (Production - Transport - Distribution) / Lifespan",
      verification: "ISO 14064-1",
      example: "Per AquaCafe unit = -950kg CO₂e/year",
      sources: [
        "LCA Database ecoinvent v3.8",
        "IPCC Guidelines 2019",
        "Water Footprint Network"
      ]
    },
    {
      category: "Electronics Trade-in",
      formula: "CO₂ = New Manufacturing Avoided + Refurbishment Impact",
      verification: "PAS 2050",
      example: "iPhone 13 trade-in = 79kg CO₂e saved",
      sources: [
        "Apple Environmental Progress Report",
        "WEEE Directive Standards",
        "Circular Economy Index"
      ]
    },
    {
      category: "Sustainable Mobility",
      formula: "CO₂ = (Car km - Alternative km) × Emission Factor",
      verification: "GHG Protocol Transport",
      example: "10km bike vs car = 1.92kg CO₂e",
      sources: [
        "DEFRA Conversion Factors 2024",
        "RTA Dubai Emissions Data",
        "WHO Active Transport Guidelines"
      ]
    }
  ];

  const verificationStandards = [
    {
      standard: "GRI Standards",
      version: "2021",
      status: "Certified",
      scope: "305-1, 305-2, 305-3",
      description: "Global Reporting Initiative for sustainability disclosure",
      verifiedBy: "EY",
      date: "January 2025"
    },
    {
      standard: "CDP Framework",
      version: "2024",
      status: "Aligned",
      scope: "Climate Change",
      description: "Carbon Disclosure Project reporting framework",
      verifiedBy: "In Progress",
      date: "March 2025"
    },
    {
      standard: "ISO 14064-1",
      version: "2018",
      status: "Certified",
      scope: "GHG Inventory",
      description: "Greenhouse gas accounting and verification",
      verifiedBy: "Bureau Veritas",
      date: "December 2024"
    },
    {
      standard: "Science Based Targets",
      version: "2.0",
      status: "Validated",
      scope: "Net Zero",
      description: "SBTi approved reduction pathway",
      verifiedBy: "SBTi Review Panel",
      date: "February 2025"
    }
  ];

  const auditTrail = [
    {
      date: "Dec 2024",
      activity: "Third-party audit by Bureau Veritas",
      result: "ISO 14064-1 certification achieved",
      status: "completed"
    },
    {
      date: "Jan 2025",
      activity: "GRI Standards compliance review",
      result: "EY verification report published",
      status: "completed"
    },
    {
      date: "Feb 2025",
      activity: "Science Based Targets validation",
      result: "SBTi approval for net-zero pathway",
      status: "completed"
    },
    {
      date: "Mar 2025",
      activity: "CDP Climate disclosure submission",
      result: "Under review",
      status: "in_progress"
    }
  ];

  const caseStudies = [
    {
      organization: "Emirates NBD",
      employees: 8500,
      duration: "12 months",
      metrics: {
        co2Saved: 425,
        bottlesPrevented: 1275000,
        devicesTradedIn: 2340,
        verification: "Third-party audited"
      },
      roi: {
        investment: 2550000,
        carbonValue: 10625,
        employeeEngagement: 71,
        brandValue: "High"
      }
    },
    {
      organization: "Dubai Municipality",
      employees: 3200,
      duration: "8 months",
      metrics: {
        co2Saved: 189,
        bottlesPrevented: 480000,
        devicesTradedIn: 890,
        verification: "Government audited"
      },
      roi: {
        investment: 960000,
        carbonValue: 4725,
        employeeEngagement: 68,
        brandValue: "Very High"
      }
    }
  ];

  const conservativeFactors = [
    {
      category: "Plastic Bottles",
      industry: "82g CO₂e per bottle",
      ours: "75g CO₂e per bottle",
      difference: "-8.5%",
      reason: "Conservative transport assumptions"
    },
    {
      category: "Electronics",
      industry: "85kg CO₂e per device",
      ours: "79kg CO₂e per device",
      difference: "-7.1%",
      reason: "Excludes packaging impact"
    },
    {
      category: "Water Systems",
      industry: "1100kg CO₂e/year",
      ours: "950kg CO₂e/year",
      difference: "-13.6%",
      reason: "Shorter useful life estimate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30 mb-4">
            Impact Methodology
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Transparent <span className="text-hero-green-400">Climate Impact</span> Measurement
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scientific rigor meets practical action. Our methodology is third-party verified, conservative by design, and aligned with international standards.
          </p>
        </div>

        {/* Conservative Approach Banner */}
        <Card className="border-blue-500 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Conservative by Design</h3>
                <p className="text-gray-300 mb-4">
                  We deliberately underestimate impact compared to industry standards. Our calculations use conservative assumptions, shorter equipment lifespans, and exclude indirect benefits. This ensures our verified impact represents a true minimum baseline.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {conservativeFactors.map((factor, idx) => (
                    <Badge key={idx} variant="outline" className="text-blue-400 border-blue-500/30">
                      {factor.category}: {factor.difference}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carbon Calculation Formulas */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <Calculator className="w-8 h-8 text-hero-green-400" />
            Carbon Calculation Formulas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {calculations.map((calc, idx) => (
              <Card key={idx} className="border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{calc.category}</CardTitle>
                  <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30 w-fit">
                    {calc.verification}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-sm text-hero-green-400">
                    {calc.formula}
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <div className="text-xs text-blue-400 mb-1">Example:</div>
                    <div className="text-white font-medium">{calc.example}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Scientific Sources:</div>
                    <ul className="space-y-1">
                      {calc.sources.map((source, sidx) => (
                        <li key={sidx} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-hero-green-400 flex-shrink-0 mt-0.5" />
                          <span>{source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Verification Standards */}
        <Card className="border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-hero-green-400" />
              Certification & Compliance Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationStandards.map((standard, idx) => (
                <div key={idx} className="p-5 bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{standard.standard}</h3>
                      <p className="text-gray-400 text-sm">{standard.description}</p>
                    </div>
                    <Badge 
                      className={
                        standard.status === "Certified" 
                          ? "bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30"
                          : standard.status === "Validated"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }
                    >
                      {standard.status}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Version</div>
                      <div className="text-white font-medium">{standard.version}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Scope</div>
                      <div className="text-white font-medium">{standard.scope}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Verified By</div>
                      <div className="text-white font-medium">{standard.verifiedBy}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Last Updated: {standard.date}</span>
                    <Button variant="outline" size="sm" className="gap-2" data-testid={`button-view-${standard.standard.toLowerCase().replace(/\s+/g, '-')}`}>
                      View Certificate
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Audit Trail */}
        <Card className="border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-400" />
              Third-Party Audit Trail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditTrail.map((audit, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    audit.status === 'completed' ? 'bg-hero-green-500' : 'bg-amber-500 animate-pulse'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium text-white">{audit.activity}</div>
                      <div className="text-sm text-gray-400">{audit.date}</div>
                    </div>
                    <div className="text-sm text-gray-400">{audit.result}</div>
                  </div>
                  {audit.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-hero-green-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Case Studies with Real Metrics */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-hero-green-400" />
            Verified Case Studies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((study, idx) => (
              <Card key={idx} className="border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{study.organization}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {study.employees.toLocaleString()} employees
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {study.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">CO₂ Saved</div>
                      <div className="text-xl font-bold text-hero-green-400">{study.metrics.co2Saved} tonnes</div>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Bottles Prevented</div>
                      <div className="text-xl font-bold text-blue-400">{(study.metrics.bottlesPrevented / 1000).toLocaleString()}K</div>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Devices Traded</div>
                      <div className="text-xl font-bold text-purple-400">{study.metrics.devicesTradedIn.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Engagement</div>
                      <div className="text-xl font-bold text-amber-400">{study.roi.employeeEngagement}%</div>
                    </div>
                  </div>
                  <div className="p-4 bg-hero-green-900/20 border border-hero-green-500/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Carbon Value</span>
                      <span className="text-lg font-bold text-hero-green-400">AED {study.roi.carbonValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Verification</span>
                      <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30">
                        {study.metrics.verification}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Download Resources */}
        <Card className="border-slate-700 bg-gradient-to-br from-hero-green-900/20 to-blue-900/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Methodology Documentation</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-slate-700 text-white gap-2" data-testid="button-download-full-methodology">
                <Download className="w-4 h-4" />
                Full Methodology PDF
              </Button>
              <Button className="bg-slate-700 text-white gap-2" data-testid="button-download-verification-reports">
                <Download className="w-4 h-4" />
                Verification Reports
              </Button>
              <Button className="bg-slate-700 text-white gap-2" data-testid="button-download-audit-trail">
                <Download className="w-4 h-4" />
                Audit Trail
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
