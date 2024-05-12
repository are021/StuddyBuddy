import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const GenerateSetLink = () => {
  return (
    <div className="mt-10 w-full">
    <h2 className="h2-semibold text-dark-200">Generate a set using AI</h2>
    <Link href="/sets/create">
      <div className="card-wrapper mt-6 w-full rounded-xl p-6">
        <p className="paragraph-regular text-dark-500">Paste notes</p>
        <p className="small-regular mt-2">or</p>
        <div>
          <Button
            variant="outline"
            className="mt-3 flex gap-3 border border-dark-300"
          >
            <Image
              src="/assets/icons/upload.svg"
              width={20}
              height={20}
              alt="upload"
            />
            <p className="paragraph-medium">Upload a file</p>
          </Button>
        </div>
      </div>
    </Link>
  </div>
  )
}

export default GenerateSetLink