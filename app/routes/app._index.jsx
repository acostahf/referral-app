import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Card,
  Button,
  HorizontalStack,
  Box,
  Divider,
  Link,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();

  const generateProduct = () => submit({}, { replace: true, method: "POST" });
  const fetchReferralStats = () => {
    console.log("fired");
  };

  return (
    <Page>
      <ui-title-bar title="Referral Program">
        <button variant="primary" onClick={generateProduct}>
          Generate a product
        </button>
      </ui-title-bar>
      <VerticalStack gap="5">
        <Layout>
          <Layout.Section>
            <Card>
              <VerticalStack gap="5">
                <Text as="h2" variant="headingMd">
                  Your Referral Dashboard 🚀
                </Text>
                <Text as="p" variant="bodyMd">
                  Here's your unique referral link:
                  {/* <Link onClick={generateReferralLinkForUser()} target="_blank">
                    Generate Referral Link
                  </Link> */}
                </Text>
                <Button onClick={fetchReferralStats}>
                  Check Your Referrals
                </Button>
                {actionData?.referralStats && (
                  <Box
                    padding="4"
                    background="bg-subdued"
                    borderColor="border"
                    borderWidth="1"
                    borderRadius="2"
                    overflowX="scroll"
                  >
                    <pre style={{ margin: 0 }}>
                      <code>
                        {JSON.stringify(actionData.referralStats, null, 2)}
                      </code>
                    </pre>
                  </Box>
                )}
              </VerticalStack>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <VerticalStack gap="5">
              <Card>
                <VerticalStack gap="2">
                  <Text as="h2" variant="headingMd">
                    Next Steps
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Explore further ways to maximize your referral benefits!
                  </Text>
                </VerticalStack>
              </Card>
            </VerticalStack>
          </Layout.Section>
        </Layout>
      </VerticalStack>
    </Page>
  );
}
