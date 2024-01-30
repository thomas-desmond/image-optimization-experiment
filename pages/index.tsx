import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image'
import { useEffect, useState } from 'react';

let backgroundImage = {
  "value": {
    "src": "https://edge.sitecorecloud.io/sitecoresaa94c3-xmcloudintr2ef7-production-9f57/media/Project/Sugcon/shared/man-with-phone-and-umbrella.jpg?h=392&iar=0&w=707",
    "alt": "",
    "width": "707",
    "height": "392"
  }
}

export default function Page() {

  const [jssOptimizedSizeInKb, setJssOptimizedSizeInKb] = useState(0);
  const [nextOptimizedSizeInKb, setNextOptimizedSizeInKb] = useState(0);

  useEffect(() => {
    const jssOptimized = document.getElementById('jss-image') as HTMLImageElement;
    getFileSize(jssOptimized.src)
      .then(sizeInfo => {
        console.log(`File size:${sizeInfo.kilobytes} KB`);
        setJssOptimizedSizeInKb(sizeInfo.kilobytes);
      });

    const nextOptimized = document.getElementById('next-image') as HTMLImageElement;
    getFileSize(nextOptimized.src)
      .then(sizeInfo => {
        console.log(`File size:${sizeInfo.kilobytes} KB`);
        setNextOptimizedSizeInKb(sizeInfo.kilobytes);
      });
  }, []);

  return (
    <main>
      <div>
        <p className="text-2xl">Original Size: 87.35 kb</p>
        <p className="text-2xl">JSS Optimized Size: {jssOptimizedSizeInKb.toFixed(2)} kb</p>
        <p className="text-2xl">Vercel Optimized Size: {nextOptimizedSizeInKb.toFixed(2)} kb</p>
      </div>
      <NextImage
        id="jss-image"
        field={backgroundImage}
        alt="man"
        unoptimized={false}
        width={707}
        height={392}
      />

      <Image id="next-image" src="/man.jpg" alt="man" height={392} width={707} />
      <p>
        Photo by <a href="https://unsplash.com/@jameswiseman?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">James Wiseman</a> on <a href="https://unsplash.com/photos/a-computer-screen-with-a-program-running-on-it-imgCpfIMoRw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </p>
    </main>
  )
}

function getFileSize(url: string): Promise<SizeInfo> {
  console.log(url);
  return fetch(url)
    .then(response => {
      const contentLengthHeader = response.headers.get('Content-Length');
      if (contentLengthHeader) {
        const fileSizeInBytes = parseInt(contentLengthHeader, 10);
        const fileSizeInKB = fileSizeInBytes / 1024;

        return {
          bytes: fileSizeInBytes,
          kilobytes: fileSizeInKB,
        };
      } else {
        return Promise.reject('Content-Length header not found in the response.');
      }
    })
    .catch(error => {
      console.error('Error fetching image:', error);
      throw error;
    });
}

interface SizeInfo {
  bytes: number;
  kilobytes: number;
}
