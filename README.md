#  Dealz Website

### Development
```
yarn # only first time
yarn dev
```

### Deployment

#### Tech used
- Vercel - Frontend deployment
- Heroku - Backend deployment
- Supabase - database and file storage


#### Steps to Deploy

1) Create a new project on supabase at https://supabase.com

2) Create a heroku project

3) Deploy dealz-strapi to heroku

4) Go to heroku panel and add environment variables listed in .env.example file in dealz-strapi project.
    - Get database credentials from supabase from Supabase Project > Settings > Database
    ![db creds](/docs/db_creds.png)
    - Get database credentials from supabase from Supabase Project > Settings > API
    ![api keys](/docs/api_url.png)

5) Create a new vercel project at https://vercel.com (Free for personal git accounts)

6) Go to Vercel panel and add environment variables listed in .env file in dealz-website project.
    ![vercel](/docs/vercel_env.png)

7) Trigger a new frontend deployment.