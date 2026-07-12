import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";

interface VerifyEmailTemplateProps {
  userFirstname?: string;
  otp: string;
  expiresIn?: number;
}

export default function VerifyEmailTemplate({
  userFirstname = "user",
  otp,
  expiresIn = 5,
}: VerifyEmailTemplateProps) {
  return (
    <Html>
      <Head />

      <Preview>Verify your AI Interviewer account</Preview>

      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily: "Inter, Arial, Helvetica, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            maxWidth: "600px",
            margin: "0 auto",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}

          <Section
            style={{
              background: "linear-gradient(90deg,#0ea5e9,#facc15)",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{
                color: "#ffffff",
                margin: 0,
                fontSize: "30px",
              }}
            >
              AI Interviewer
            </Heading>

            <Text
              style={{
                color: "#ffffff",
                marginTop: "10px",
                fontSize: "16px",
              }}
            >
              Email Verification
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
                fontSize: "24px",
                color: "#111827",
              }}
            >
              Hello {userFirstname},
            </Heading>

            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "28px",
              }}
            >
              Thank you for creating your AI Interviewer account.
            </Text>

            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "28px",
              }}
            >
              Please use the verification code below to verify your email
              address.
            </Text>

            {/* OTP */}

            <Section
              style={{
                backgroundColor: "#f9fafb",
                border: "2px dashed #0ea5e9",
                borderRadius: "12px",
                padding: "25px",
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Verification Code
              </Text>

              <Heading
                style={{
                  letterSpacing: "12px",
                  fontSize: "40px",
                  margin: "15px 0",
                  color: "#0284c7",
                }}
              >
                {otp}
              </Heading>

              <Text
                style={{
                  margin: 0,
                  color: "#ef4444",
                  fontSize: "14px",
                }}
              >
                Expires in {expiresIn} minutes
              </Text>
            </Section>

            <Text
              style={{
                color: "#4b5563",
                fontSize: "15px",
                lineHeight: "28px",
              }}
            >
              If you didn&apos;t create an account, you can safely ignore this
              email.
            </Text>

            <Hr />

            {/* Security */}

            <Text
              style={{
                color: "#ef4444",
                fontSize: "14px",
                lineHeight: "24px",
              }}
            >
              🔒 Never share this verification code with anyone. AI Interviewer
              staff will never ask for your OTP.
            </Text>
          </Section>

          {/* Footer */}

          <Section
            style={{
              backgroundColor: "#f9fafb",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: "13px",
                lineHeight: "22px",
              }}
            >
              © {new Date().getFullYear()} AI Interviewer
            </Text>

            <Text
              style={{
                color: "#9ca3af",
                fontSize: "12px",
              }}
            >
              This email was sent automatically. Please do not reply.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
