import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { PATHS } from '@/constant/_paths'
import { useDeleteResume, usePublishResume } from '@/hooks/api/use-resume'
import { cn } from '@/utils/cn'
import useUrlState from '@ahooksjs/use-url-state'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function DeleteModal() {
  const [url, _] = useUrlState<{ delete: string }>({ delete: '' })
  const navigate = useNavigate()
  const { mutate } = useDeleteResume()

  const onChange = (val: boolean) => {
    if (!val) navigate(PATHS.DASHBOARD)
  }

  const onDeleteResume = () => {
    const payload = {
      id: Number(url.delete),
    }
    mutate(payload, {
      onSuccess: () => {
        onChange(false)
      },
    })
  }

  return (
    <AlertDialog open={url.delete !== ''} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure delete this cv?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this cv
            from our server
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeleteResume}
            className={cn(buttonVariants({ variant: 'destructive' }))}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export function PublishModal() {
  const [url, _] = useUrlState<{ publish: string }>({ publish: '' })
  const navigate = useNavigate()
  const { mutate } = usePublishResume()

  const onChange = (val: boolean) => {
    if (!val) navigate(PATHS.DASHBOARD)
  }

  const onPublish = () => {
    const payload = {
      id: Number(url.publish),
    }
    mutate(payload, {
      onSuccess: () => {
        onChange(false)
      },
    })
  }

  return (
    <AlertDialog open={url.publish !== ''} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure publish this cv?</AlertDialogTitle>
          <AlertDialogDescription>
            This cv will be public so anyone can read it
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onPublish}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
