const {
  EXPO_PUBLIC_API_BASE_URL,
  EXPO_PUBLIC_API_TOKEN,
  EXPO_PUBLIC_IMAGE_BUCKET
} = process.env

const env = {
  apiBaseUrl: EXPO_PUBLIC_API_BASE_URL,
  apiImageBucketUrl: EXPO_PUBLIC_IMAGE_BUCKET,
  apiToken: EXPO_PUBLIC_API_TOKEN
}

export default env
