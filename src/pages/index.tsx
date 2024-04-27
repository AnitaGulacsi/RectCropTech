import { base64test } from "@/helpers/base64";
import { API_CONFIG } from "./api/apiRoutes";
import { ImageProcessor } from "@/components/image-processor/ImageProcessor";

export default function Home({ apiData }: any) {
  return (
    <main className="mx-10 my-10">
      <div className="flex justify-center">
        <h1 className="text-blue-800">RECT-CROP-TECH APP</h1>
      </div>
      <div className="flex flex-row justify-center">
        {apiData.map((item: { name: string }, index: number) => (
          <ImageProcessor key={index}>{item.name}</ImageProcessor>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const requestData = {
    requests: [
      {
        image: {
          content: base64test,
        },
        features: [
          {
            maxResults: "3",
            type: "OBJECT_LOCALIZATION",
          },
        ],
      },
    ],
  };

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VISION_API}?key=${API_CONFIG.API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
  );

  const data = await response.json();

  return {
    props: {
      apiData: data.responses[0]?.localizedObjectAnnotations || [],
    },
  };
}
