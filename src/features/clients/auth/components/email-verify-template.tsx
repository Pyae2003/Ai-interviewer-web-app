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
  userFirstname = "there",
  otp,
  expiresIn = 5,
}: VerifyEmailTemplateProps) {
  const name = userFirstname?.trim() || "there";

  return (
    <Html>
      <Head />

      <Preview>Your AI Interviewer verification code is {otp}</Preview>

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
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* ================= HEADER ================= */}

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
                fontSize: "28px",
                lineHeight: "36px",
                fontWeight: "700",
                margin: 0,
              }}
            >
              AI Interviewer
            </Heading>

            <Text
              style={{
                color: "#e0f2fe",
                fontSize: "14px",
                lineHeight: "20px",
                margin: "8px 0 0",
              }}
            >
              Secure Email Verification
            </Text>
          </Section>

          {/* ================= CONTENT ================= */}

          <Section
            style={{
              padding: "40px",
            }}
          >
            <Heading
              style={{
                color: "#111827",
                fontSize: "26px",
                lineHeight: "34px",
                fontWeight: "700",
                margin: "0 0 20px",
              }}
            >
              Verify Your Email
            </Heading>

            <Text
              style={{
                color: "#374151",
                fontSize: "16px",
                lineHeight: "26px",
                margin: "0 0 16px",
              }}
            >
              Hi <strong>{name}</strong>,
            </Text>

            <Text
              style={{
                color: "#4b5563",
                fontSize: "15px",
                lineHeight: "25px",
                margin: "0 0 16px",
              }}
            >
              Welcome to AI Interviewer. Please use the verification code below
              to confirm your email address and activate your account.
            </Text>

            {/* ================= OTP CARD ================= */}

            <Section
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "28px 20px",
                margin: "30px 0",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Verification Code
              </Text>

              <Heading
                style={{
                  color: "#0284c7",
                  fontSize: "38px",
                  lineHeight: "48px",
                  fontWeight: "700",
                  letterSpacing: "10px",
                  margin: "14px 0",
                }}
              >
                {otp}
              </Heading>

              <Text
                style={{
                  color: "#dc2626",
                  fontSize: "13px",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                This code expires in {expiresIn} minutes
              </Text>
            </Section>

            {/* ================= INSTRUCTION ================= */}

            <Text
              style={{
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "23px",
                margin: "0 0 20px",
              }}
            >
              Enter this code in the AI Interviewer verification screen to
              continue. For your security, never share this code with anyone.
            </Text>

            <Hr
              style={{
                borderColor: "#e5e7eb",
                margin: "28px 0",
              }}
            />

            {/* ================= SECURITY NOTICE ================= */}

            <Section
              style={{
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <Text
                style={{
                  color: "#9a3412",
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "22px",
                  margin: "0 0 6px",
                }}
              >
                🔒 Keep your code private
              </Text>

              <Text
                style={{
                  color: "#9a3412",
                  fontSize: "13px",
                  lineHeight: "21px",
                  margin: 0,
                }}
              >
                AI Interviewer staff will never ask you for your verification
                code. If you did not request this code, you can safely ignore
                this email.
              </Text>
            </Section>
          </Section>

          {/* ================= FOOTER ================= */}

          <Section
            style={{
              backgroundColor: "#f8fafc",
              padding: "24px 30px",
              textAlign: "center",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: "13px",
                lineHeight: "20px",
                margin: 0,
              }}
            >
              This email was sent automatically.
            </Text>

            <Text
              style={{
                color: "#9ca3af",
                fontSize: "12px",
                lineHeight: "18px",
                margin: "8px 0 0",
              }}
            >
              © {new Date().getFullYear()} AI Interviewer. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
