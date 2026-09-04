import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
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
  const name = userFirstname?.trim() || "there";

  return (
    <Html>
      <Head />

      <Preview>Reset your AI Interviewer password</Preview>

      <Body
        style={{
          backgroundColor: "#f8fafc",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "40px 0",
          margin: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            margin: "0 auto",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#0ea5e9",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{
                color: "#ffffff",
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
              }}
            >
              AI Interviewer
            </Heading>

            <Text
              style={{
                color: "#ffffff",
                margin: "8px 0 0",
                fontSize: "15px",
              }}
            >
              Secure Password Reset
            </Text>
          </Section>

          {/* Content */}
          <Section
            style={{
              padding: "40px",
            }}
          >
            <Heading
              style={{
                color: "#111827",
                fontSize: "28px",
                lineHeight: "36px",
                margin: "0 0 24px",
              }}
            >
              Reset Your Password
            </Heading>

            <Text
              style={{
                color: "#374151",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Hi <strong>{name}</strong>,
            </Text>

            <Text
              style={{
                color: "#374151",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              We received a request to reset the password for your AI
              Interviewer account.
            </Text>

            <Text
              style={{
                color: "#374151",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Click the button below to create a new password.
            </Text>

            <Section
              style={{
                textAlign: "center",
                padding: "10px 0 20px",
              }}
            >
              <Button
                href={resetPasswordLink}
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  padding: "14px 32px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                Reset Password
              </Button>
            </Section>

            <Text
              style={{
                marginTop: "20px",
                color: "#dc2626",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              This link expires in 30 minutes.
            </Text>

            <Hr
              style={{
                borderColor: "#e5e7eb",
                margin: "28px 0",
              }}
            />

            <Text
              style={{
                color: "#374151",
                fontSize: "14px",
                lineHeight: "22px",
              }}
            >
              If the button doesn&apos;t work, copy and paste this link into
              your browser:
            </Text>

            <Link
              href={resetPasswordLink}
              style={{
                color: "#0ea5e9",
                fontSize: "13px",
                lineHeight: "20px",
                wordBreak: "break-all",
              }}
            >
              {resetPasswordLink}
            </Link>

            <Hr
              style={{
                borderColor: "#e5e7eb",
                margin: "28px 0",
              }}
            />

            <Text
              style={{
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: "22px",
              }}
            >
              If you didn&apos;t request a password reset, simply ignore this
              email. Your password will remain unchanged.
            </Text>

            <Text
              style={{
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: "22px",
              }}
            >
              Never share this email or reset link with anyone.
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#f9fafb",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: "13px",
                margin: "0 0 8px",
              }}
            >
              Need help?
            </Text>

            <Link
              href="mailto:support@aiinterviewer.com"
              style={{
                color: "#0ea5e9",
                fontSize: "14px",
              }}
            >
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
  userFirstname: "Pyae",
  resetPasswordLink:
    "https://aiinterviewer.example/reset-password/example-token",
} as ResetPasswordEmailTemplateProps;

export default ResetPasswordEmailTemplate;
