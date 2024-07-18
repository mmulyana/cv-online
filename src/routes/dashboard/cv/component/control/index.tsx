import { Button } from '@/components/ui/button'
import useUrlState from '@ahooksjs/use-url-state'
import {
  Briefcase,
  GraduationCap,
  Presentation,
  Sparkles,
  UserIcon,
} from 'lucide-react'
import { useMemo } from 'react'
import { BasicForm, EducationForm, ExperienceForm, PortfolioForm } from './form'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Control() {
  const [url, setUrl] = useUrlState({ state: '' })

  const sectionMenus = useMemo(
    () => [
      {
        name: 'Basic Information',
        state: '',
        icon: <UserIcon className='w-4 h-4 opacity-50' />,
        onClick: () => {
          setUrl({ state: '' })
        },
      },
      {
        name: 'Education',
        state: 'education',
        icon: <GraduationCap className='w-4 h-4 opacity-50' />,
        onClick: () => {
          setUrl({ state: 'education' })
        },
      },
      {
        name: 'Experience',
        state: 'experience',
        icon: <Briefcase className='w-4 h-4 opacity-50' />,
        onClick: () => {
          setUrl({ state: 'experience' })
        },
      },
      {
        name: 'Porfolio',
        state: 'portfolio',
        icon: <Presentation className='w-4 h-4 opacity-50' />,
        onClick: () => {
          setUrl({ state: 'portfolio' })
        },
      },
      {
        name: 'Skill',
        state: 'skill',
        icon: <Sparkles className='w-4 h-4 opacity-50' />,
        onClick: () => {
          setUrl({ state: 'skill' })
        },
      },
    ],
    []
  )

  const formMenus = useMemo<Record<string, React.ReactNode>>(
    () => ({
      basic: <BasicForm />,
      experience: <ExperienceForm />,
      education: <EducationForm />,
      portfolio: <PortfolioForm />,
    }),
    []
  )

  return (
    <div className='h-[calc(100dvh-66px)] flex'>
      <div className='flex-0 w-[200px] h-full bg-white flex flex-col gap-1 p-2 border-r border-gray-200'>
        {sectionMenus.map((section, index) => (
          <Button
            variant={section.state == url.state ? 'default' : 'ghost'}
            key={index}
            onClick={section.onClick}
            className='flex gap-2 items-center justify-start'
          >
            {section.icon}
            {section.name}
          </Button>
        ))}
      </div>
      <ScrollArea className='flex-1 w-full h-full bg-white p-2 py-4'>
        {formMenus[url.state || 'basic']}
      </ScrollArea>
    </div>
  )
}
