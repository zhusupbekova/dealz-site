# Strapi application

A quick description of your strapi application

# Dealz Website

## Development

```
yarn # only first time
yarn dev
```

## Deployment

#### Tech used

- Vercel - Frontend deployment
- Heroku - Backend deployment
- Supabase - database and file storage

#### Steps to Deploy

1. Create a new project on supabase at https://supabase.com

2. Create a heroku project

3. Deploy **dealz-strapi** to heroku

4. Go to heroku panel and add environment variables listed in `.env.example` file in **dealz-strapi** project to `.env` file.

   - Get database credentials from supabase from Supabase Project > Settings > Database
     ![db creds](/docs/db_creds.png)
   - Get database credentials from supabase from Supabase Project > Settings > API
     ![api keys](/docs/api_url.png)

5. Download SSL certificate from supabase from Supabase Project > Settings > Database, rename it to **_prod-ca-2021.crt_**, paste it in root directory of **dealz-strapi**
   ![ssl certificate](/docs/ssl_certificate.png)
6. Create a new vercel project at https://vercel.com (Free for personal git accounts)

7. Change variables' values in `.env.production` file in **dealz-website** project

8. Trigger a new frontend deployment.

---

## Theme customization

Change colors in `/styles/global.css`

## Brand, social links & google analytics id customization

Change data in `/config.tsx`

## Share options

Change data of `shareSocialOptions` variable at `/components/common/Button.tsx`
