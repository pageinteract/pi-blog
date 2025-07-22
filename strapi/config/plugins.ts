module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"), // Required
      },
      settings: {
        defaultFrom: "support@pageinteract.com",
        defaultReplyTo: "support@pageinteract.com",
      },
    },
  },
  oembed: {
    enabled: true,
  },
});
