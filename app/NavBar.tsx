'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'

interface LinkType {
  label: string
  href: string
}

const NavBar = () => {
  const currentPath = usePathname()
  
  const links:LinkType[] = [
    {label: 'Dashboard', href:'/'},
    {label: 'Issues', href:'/issues'},
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
    </nav>
  )
}

export default NavBar