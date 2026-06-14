from google import genai
from typing import Protocol

client = genai.Client(api_key="AQ.Ab8RN6IzPIyRYedo-cqQtHZ9FE0TlocA_19aauL8DMGof22DLA");

models = client.models.list()

print("Available models:")
for model in models:
    print(model.name)

question = "Hey, how are you doing today?"

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=question
)

print(f"Question: {question}\nAnswer: {response.text}")