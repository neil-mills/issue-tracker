'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

interface LinkType {
  label: string
  href: string
}

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data:session } = useSession()
  
  const links:LinkType[] = [
    {label: 'Dashboard', href:'/'},
    {label: 'Issues', href:'/issues/list'},
  ]
  const NavItem = (link:LinkType) => {
    const linkClass = classNames({
      'text-zinc-900': link.href === currentPath,
      'text-zinc-400': link.href !== currentPath
    })
    return (
      <li key={link.href}><Link className={`${linkClass} hover:text-zinc-800 transitions-colors`} href={link.href}>{link.label}</Link></li>
    )
  }
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/"><AiFillBug /></Link>
      <ul className="flex space-x-6">
        {links.map((link) => NavItem(link))}
      </ul>
      <Box>
        {status === "authenticated" && <Link href="/api/auth/signout">Sign out</Link>}
        {status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
      </Box>
    </nav>
  )
}

export default NavBar