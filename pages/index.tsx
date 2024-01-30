import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image'
import { useEffect, useState } from 'react';

let imageFromEdge = {
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
  const [nextOptimizedSizeInKbLocal, setNextOptimizedSizeInKbLocal] = useState(0);

  useEffect(() => {
    const jssOptimizedEdge = document.getElementById('jss-image-edge') as HTMLImageElement;
    getFileSize(jssOptimizedEdge.src)
      .then(sizeInfo => {
        console.log(`File size:${sizeInfo.kilobytes} KB`);
        setJssOptimizedSizeInKb(sizeInfo.kilobytes);
      });

    const nextOptimizedEdge = document.getElementById('next-image-edge') as HTMLImageElement;
    getFileSize(nextOptimizedEdge.src)
      .then(sizeInfo => {
        console.log(`File size:${sizeInfo.kilobytes} KB`);
        setNextOptimizedSizeInKb(sizeInfo.kilobytes);
      });
  }, []);

  return (
    <main>
      <div>
        <p className="text-2xl">Original Size: 87.35 kb</p>
        <p className="text-2xl mt-4">Image from Edge</p>
        <p className="text-2xl">JSS Optimized Size: {jssOptimizedSizeInKb.toFixed(2)} kb</p>
      </div>
      <NextImage
        id="jss-image-edge"
        field={imageFromEdge}
        alt="man"
        unoptimized={false}
        width={707}
        height={392}
      />
      <p className="text-2xl mt-4">Next Optimized Size: {nextOptimizedSizeInKb.toFixed(2)} kb</p>
      <Image id="next-image-edge" src={imageFromEdge.value.src} alt="man" height={392} width={707} />

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
