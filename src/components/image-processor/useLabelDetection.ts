import { useEffect, useState } from "react";
import axios from "axios";
import { API_CONFIG } from "@/pages/api/apiRoutes";

export const useLabelDetection = (imageDataUrl: string) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLabels = async () => {
      if (!imageDataUrl) return;

      setIsLoading(true);
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VISION_API}?key=${API_CONFIG.API_KEY}`;
      const body = {
        requests: [
          {
            image: {
              content: imageDataUrl.split(",")[1], // Remove the base64 header
            },
            features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
          },
        ],
      };

      try {
        const response = await axios.post(url, body);
        const labels = response.data.responses[0].labelAnnotations.map(
          (label: any) => label.description
        );
        setLabels(labels);
      } catch (error) {
        console.error("Error calling Google Vision API:", error);
        setLabels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLabels();
  }, [imageDataUrl]);

  return { isLoading, labels };
};
