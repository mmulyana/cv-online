import { userAtom } from '@/atoms/user'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PATHS } from '@/constant/_paths'
import { cn } from '@/utils/cn'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useAtom, useAtomValue } from 'jotai'
import { ChevronDown, LogOutIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useCreateResume, useUpdateResume } from '@/hooks/api/use-resume'
import useUrlState from '@ahooksjs/use-url-state'
import { resumeAtom } from './cv'

export default function Layout({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Navbar setOpen={setIsOpen} />
      <div className={cn('px-4 md:px-6 pt-16', className)}>{children}</div>
      <Profile open={isOpen} setOpen={setIsOpen} />
    </>
  )
}

type NavbarProps = {
  setOpen: (val: boolean) => void
}
export function Navbar(props: NavbarProps) {
  const navigate = useNavigate()
  const [url, setUrl] = useUrlState({ id: '' })

  const { mutate: createResume } = useCreateResume()
  const { mutate: updateResume } = useUpdateResume(
    isNaN(url.id) ? 0 : Number(url.id)
  )

  const user = useAtomValue(userAtom)
  const resume = useAtomValue(resumeAtom)

  const onLogout = () => {
    CookieStorage.remove(CookieKeys.AuthToken)
    navigate(PATHS.LANDING_PAGE)
  }

  const onClickResume = () => {
    if (!isNaN(url.id)) {
      const payload = {
        ...resume,
        id: Number(url.id),
      }
      updateResume(payload)
      return
    }

    createResume({ ...resume })
  }

  return (
    <header className='fixed top-0 left-0 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6 z-10'>
      <Link to='/' className='flex items-center gap-2'>
        <span className='text-lg font-semibold text-primary'>CV Online</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='w-fit rounded-full flex gap-2 items-center pl-1 pr-1.5 hover:bg-transparent border border-transparent hover:border-primary/50'
          >
            <div className='h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center'>
              <UserIcon className='w-6 h-6 text-slate-800' />
            </div>
            <div className='text-left'>
              <p className='text-slate-800'>{user?.username || ''}</p>
            </div>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='px-2 pb-2'>
          <DropdownMenuItem>
            <button
              className='flex gap-2 items-center'
              onClick={() => {
                props.setOpen(true)
              }}
            >
              <UserIcon className='h-4 w-4' />
              <span>Account</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={buttonVariants({
              variant: 'destructive',
              className: 'w-full',
            })}
          >
            <button className='flex gap-2 items-center' onClick={onLogout}>
              <LogOutIcon className='h-4 w-4' />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

type AccountProps = {
  setOpen: (val: boolean) => void
  open: boolean
}
export function Profile(props: AccountProps) {
  const user = useAtomValue(userAtom)

  return (
    <Dialog onOpenChange={props.setOpen} open={props.open}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2 items-start'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' defaultValue={user?.username || ''} disabled />
          </div>
        </div>
        <DialogFooter>
          <div className='flex justify-between items-center w-full'>
            <Button
              onClick={() => props.setOpen(false)}
              variant='ghost'
              className='text-red-500 hover:bg-red-500 hover:text-white'
            >
              Delete Account
            </Button>
            <Button onClick={() => props.setOpen(false)} type='submit'>
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
