async function testSarvam() {
  const url = "http://127.0.0.1:5005/fininsight-paytm/us-central1/analyzeFinancialMessage";
  const payload = {
    data: {
      message: "I earn 35000 per month and need 5 lakh for a car. I can afford around 15000 EMI."
    }
  };

  console.log("Sending request to local Firebase Functions emulator...");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json();
  console.log("RESPONSE_STATUS:", res.status);
  console.log("RESPONSE_DATA:", JSON.stringify(json, null, 2));
}

testSarvam().catch((err) => {
  console.error("Test execution failed:", err);
});
