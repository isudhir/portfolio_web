// TODO: fill from LinkedIn profile https://www.linkedin.com/in/sudhir-here/
import type { Certification } from '@/types';

export const certifications: Certification[] = [
  {
    id: 'aws-solutions-architect',
    title: 'Neural Networks and Deep Learning', 
    issuer: 'DeepLearning.AI / Coursera',
    date: '2019',
    url: 'https://www.coursera.org/account/accomplishments/verify/G27ZR2H47TM7', // TODO real badge URL
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png?auto=format%2Ccompress&dpr=1',
  },
  {
    id: 'nodejs-certification',
    title: 'Machine Learning', 
    issuer: 'Standford University / Coursera',
    date: '2019',
    url: 'https://www.coursera.org/account/accomplishments/verify/2U6FZUDZFGB8', // TODO real badge URL
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXMKyqD3BQyoFlwzib8-mSdDBjxaz3f5WM_6LWBFmneAzH_-n_9xEn5Yl&s=10',
  }
];
