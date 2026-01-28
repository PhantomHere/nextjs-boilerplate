import Image from 'next/image'
import Link from 'next/link'

export default function Header_logo() {
  return (
    <header className="border-b bg-[#19222e]">
      <div className="container mx-auto px-4 py-2 flex justify-center">
        <Link href="/">
          <Image
            src="imgs/logo.svg"
            alt="Company Logo"
            width={150}
            height={50}
            priority
            className='h-25 w-auto'
          />
        </Link>
      </div>
    </header>
  )
}
