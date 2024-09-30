## Developing

installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
 
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
# lott-mypage-front


## manual deploy using cloud build 
```bash
gcloud builds submit --project pragmatic-parking-dev --config cloudbuild.yaml --substitutions=$(gcloud beta builds triggers describe my-lott-frontend-deploy	 --format json  --project pragmatic-parking-dev | jq -r '.substitutions | to_entries | map(.key + "=" + (.value | tostring)) |  join(",")')
```