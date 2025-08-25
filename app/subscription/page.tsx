import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
  const appearanceOverrides = {
    variables: {
      colorPrimary: "#4F46E5",
      colorText: "#111827",
      fontFamily: "Inter, sans-serif",
    },
    elements: {
      card: { borderRadius: "1rem" },
      planHeader: { backgroundColor: "#EEF2FF" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 flex justify-center items-center">
      <PricingTable
        appearance={appearanceOverrides}
        checkoutProps={{ appearance: appearanceOverrides }}
        collapseFeatures={false}
        ctaPosition="top"
        fallback={<div className="text-center p-8">Loading plans…</div>}
        forOrganizations={false}
        newSubscriptionRedirectUrl="/thank-you"
      />
    </div>
  );
};

export default Subscription;
