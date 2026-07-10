import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Hr,
  Link,
  Preview,
  Heading,
  Section,
  Text,
} from "react-email";

interface ResetPasswordEmailTemplateProps {
  userFirstname?: string;
  resetPasswordLink: string;
}

export const ResetPasswordEmailTemplate = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your AI Interviewer password</Preview>
      <Body
        style={{
          backgroundColor: "#f8fafc",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            background: "#ffffff",
            borderRadius: "16px",
            margin: "0 auto",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {" "}
          <Section
            style={{
              background: "linear-gradient(90deg,#0ea5e9,#facc15)",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{
                color: "#ffffff",
                margin: 0,
              }}
            >
              AI Interviewer
            </Heading>
            <Text
              style={{
                color: "#ffffff",
                marginTop: "8px",
              }}
            >
              Secure Password Reset
            </Text>
          </Section>
          <Section style={{ padding: "40px" }}>
            <Heading
              style={{
                color: "#111827",
                fontSize: "28px",
              }}
            >
              Reset Your Password
            </Heading>

            <Text>
              Hi <strong>{userFirstname}</strong>,
            </Text>

            <Text>
              We received a request to reset the password for your AI
              Interviewer account.
            </Text>

            <Text>Click the button below to create a new password.</Text>

            <Button
              href={resetPasswordLink}
              style={{
                backgroundColor: "#0ea5e9",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "10px",
                textDecoration: "none",
                display: "inline-block",
                fontWeight: "600",
                marginTop: "20px",
              }}
            >
              Reset Password
            </Button>

            <Text
              style={{
                marginTop: "28px",
                color: "#dc2626",
                fontWeight: "600",
              }}
            >
              This link expires in 30 minutes.
            </Text>

            <Hr />

            <Text>
              If the button doesn&apos;t work, copy and paste this link into your
              browser:
            </Text>

            <Link href={resetPasswordLink}>{resetPasswordLink}</Link>

            <Hr />

            <Text>
              If you didn&apos;t request a password reset, simply ignore this email.
              Your password will remain unchanged.
            </Text>

            <Text>Never share this email or reset link with anyone.</Text>
          </Section>
          <Section
            style={{
              background: "#f9fafb",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Need help?
            </Text>

            <Link href="mailto:support@aiinterviewer.com">
              support@aiinterviewer.com
            </Link>

            <Text
              style={{
                color: "#9ca3af",
                fontSize: "12px",
                marginTop: "16px",
              }}
            >
              © 2026 AI Interviewer. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmailTemplate.PreviewProps = {
  resetPasswordLink: "https://www.dropbox.com",
} as ResetPasswordEmailTemplateProps;

export default ResetPasswordEmailTemplate;
