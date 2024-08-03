import { educationSchema, experienceSchema, portfolioSchema } from './schema'
import { resumeAtom, isResumeChangedAtom } from '../..'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import InputDate from '@/components/common/Input-date'
import { Input } from '@/components/ui/input'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { Resume } from '@/types/resume'
import { z } from 'zod'

export function BasicForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      address: '',
      description: '',
      photo: '',
      contact: {
        email: '',
        linkedin: '',
        phone: '',
        portfolioWeb: '',
      },
    },
  })
  const [loaded, setLoaded] = useState(false)
  const [resume, setResume] = useAtom(resumeAtom)
  const setResumeHasChanged = useSetAtom(isResumeChangedAtom)

  useEffect(() => {
    if (!loaded && resume) {
      form.setValue('name', resume?.name || '')
      form.setValue('description', resume?.description || '')
      form.setValue('address', resume?.address || '')
      form.setValue('contact.email', resume?.contact.email || '')
      form.setValue('contact.phone', resume?.contact.phone || '')
      form.setValue('contact.email', resume?.contact.email || '')
      form.setValue('contact.portfolioWeb', resume?.contact.portofolioWeb || '')

      setLoaded(true)
    }
  }, [resume, loaded])

  useEffect(() => {
    const subscription = form.watch((data) => {
      const payload = {
        name: data.name,
        address: data.address,
        description: data.description,
        photo: '',
        contact: { ...data.contact },
      } as Partial<Resume>

      setResume((prev) => ({ ...prev!, ...payload }))
      setResumeHasChanged(true)
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4 px-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contact.email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input placeholder='example@mail.com' {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contact.linkedin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contact.phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contact.portfolioWeb'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website or portfolio</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export function EducationForm() {
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: [
        {
          title: '',
          school: '',
          description: '',
          start_date: '',
          end_date: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'education',
    control: form.control,
  })

  const [resume, setResume] = useAtom(resumeAtom)
  const [loaded, setLoaded] = useState(false)

  const handleDateSelect = (
    index: number,
    selectedDate: Date | undefined,
    type: string
  ) => {
    if (selectedDate) {
      const date = new Date(selectedDate)
      if (type == 'start_date') {
        form.setValue(`education.${index}.start_date`, date.toISOString())
      } else {
        form.setValue(`education.${index}.end_date`, date.toISOString())
      }
    }
  }

  useEffect(() => {
    if (!loaded && resume && resume.education && resume.education.length > 0) {
      form.reset({ education: resume.education })
      setLoaded(true)
    }
  }, [resume, loaded])

  useEffect(() => {
    const subscription = form.watch((data: any) => {
      setResume((prev) => ({ ...prev!, education: [...data.education] }))
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4 px-3'>
        <div className='flex justify-between items-center'>
          <FormLabel className='text-xs text-gray-400'>Educations</FormLabel>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={() =>
              append({
                title: '',
                description: '',
                school: '',
                start_date: '',
                end_date: '',
              })
            }
          >
            <span className='text-xs'>Add</span>
          </Button>
        </div>
        {fields.map((_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <div>
              <FormLabel
                htmlFor={`education.${index}.title`}
                className='text-xs font-normal text-gray-500'
              >
                Title
              </FormLabel>
              <Input
                placeholder='title'
                {...form.register(`education.${index}.title`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`education.${index}.school`}
                className='text-xs font-normal text-gray-500'
              >
                School
              </FormLabel>
              <Input
                placeholder='school'
                {...form.register(`education.${index}.school`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`education.${index}.description`}
                className='text-xs font-normal text-gray-500'
              >
                Description
              </FormLabel>
              <Textarea
                placeholder='description'
                {...form.register(`education.${index}.description`)}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <FormLabel
                  htmlFor={`education.${index}.start_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  Start Date
                </FormLabel>
                <InputDate
                  name={`education.${index}.start_date`}
                  control={form.control}
                  handleSelect={handleDateSelect}
                  index={index}
                />
              </div>
              <div>
                <FormLabel
                  htmlFor={`education.${index}.end_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  End Date
                </FormLabel>
                <InputDate
                  name={`education.${index}.end_date`}
                  control={form.control}
                  handleSelect={handleDateSelect}
                  index={index}
                  type='end_date'
                />
              </div>
            </div>
            <div>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => remove(index)}
              >
                <span className='text-xs'>Remove</span>
              </Button>
            </div>
          </div>
        ))}
      </form>
    </Form>
  )
}

export function ExperienceForm() {
  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'experience',
    control: form.control,
  })

  const [resume, setResume] = useAtom(resumeAtom)
  const [loaded, setLoaded] = useState(false)

  const handleDateSelect = (
    index: number,
    selectedDate: Date | undefined,
    type: string
  ) => {
    if (selectedDate) {
      const date = new Date(selectedDate)
      if (type == 'start_date') {
        form.setValue(`experience.${index}.start_date`, date.toISOString())
      } else {
        form.setValue(`experience.${index}.end_date`, date.toISOString())
      }
    }
  }

  useEffect(() => {
    if (
      !loaded &&
      resume &&
      resume.experience &&
      resume.experience.length > 0
    ) {
      form.reset({ experience: resume.experience })
      setLoaded(true)
    }
  }, [resume, loaded])

  useEffect(() => {
    const subscription = form.watch((data: any) => {
      const experience = [...data.experience]
      setResume((prev) => ({ ...prev!, experience }))
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4 px-3'>
        <div className='flex justify-between items-center'>
          <FormLabel className='text-xs text-gray-400'>Experiences</FormLabel>
          <Button
            type='button'
            variant='secondary'
            size='sm'
            onClick={() =>
              append({
                title: '',
                description: '',
                company: '',
                start_date: '',
                end_date: '',
                link: '',
              })
            }
          >
            <span className='text-xs'>Add</span>
          </Button>
        </div>
        {fields.map((_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <div>
              <FormLabel
                htmlFor={`educations.${index}.title`}
                className='text-xs font-normal text-gray-500'
              >
                Title
              </FormLabel>
              <Input
                placeholder='title'
                {...form.register(`experience.${index}.title`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`experience.${index}.company`}
                className='text-xs font-normal text-gray-500'
              >
                Company
              </FormLabel>
              <Input
                placeholder='company'
                {...form.register(`experience.${index}.company`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`experience.${index}.link`}
                className='text-xs font-normal text-gray-500'
              >
                Link
              </FormLabel>
              <Input
                placeholder='link'
                {...form.register(`experience.${index}.link`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`experience.${index}.description`}
                className='text-xs font-normal text-gray-500'
              >
                Description
              </FormLabel>
              <Textarea
                placeholder='description'
                {...form.register(`experience.${index}.description`)}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <FormLabel
                  htmlFor={`experience.${index}.start_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  Start Date
                </FormLabel>
                <InputDate
                  name={`experience.${index}.start_date`}
                  control={form.control}
                  handleSelect={handleDateSelect}
                  index={index}
                />
              </div>
              <div>
                <FormLabel
                  htmlFor={`experience.${index}.end_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  End Date
                </FormLabel>
                <InputDate
                  name={`experience.${index}.end_date`}
                  control={form.control}
                  handleSelect={handleDateSelect}
                  index={index}
                  type='end_date'
                />
              </div>
            </div>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='inline-block w-fit'
              onClick={() => remove(index)}
            >
              <span className='text-xs'>Remove</span>
            </Button>
          </div>
        ))}
      </form>
    </Form>
  )
}

export function PortfolioForm() {
  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      portfolio: [
        {
          title: '',
          role: '',
          description: '',
          start_date: '',
          end_date: '',
          link: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'portfolio',
    control: form.control,
  })

  const [resume, setResume] = useAtom(resumeAtom)
  const [loaded, setLoaded] = useState(false)

  const handleDateSelect = (
    index: number,
    selectedDate: Date | undefined,
    type: string
  ) => {
    if (selectedDate) {
      const date = new Date(selectedDate)
      if (type == 'start_date') {
        form.setValue(`portfolio.${index}.start_date`, date.toISOString())
      } else {
        form.setValue(`portfolio.${index}.end_date`, date.toISOString())
      }
    }
  }

  useEffect(() => {
    if (!loaded && resume && resume.portfolio && resume.portfolio.length > 0) {
      form.reset({ portfolio: resume.portfolio })
      setLoaded(true)
    }
  }, [resume, loaded])

  useEffect(() => {
    const subscription = form.watch((data: any) => {
      const portfolio = [...data.portfolio]
      setResume((prev) => ({ ...prev!, portfolio }))
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4 px-3'>
        <div className='flex justify-between items-center'>
          <FormLabel className='text-xs text-gray-400'>Portfolios</FormLabel>
          <Button
            type='button'
            variant='secondary'
            size='sm'
            onClick={() =>
              append({
                title: '',
                role: '',
                description: '',
                start_date: '',
                end_date: '',
                link: '',
              })
            }
          >
            <span className='text-xs'>Add</span>
          </Button>
        </div>
        {fields.map((_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <div>
              <FormLabel
                htmlFor={`portfolio.${index}.title`}
                className='text-xs font-normal text-gray-500'
              >
                Title
              </FormLabel>
              <Input
                placeholder='title'
                {...form.register(`portfolio.${index}.title`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`portfolio.${index}.role`}
                className='text-xs font-normal text-gray-500'
              >
                Role
              </FormLabel>
              <Input
                placeholder='role'
                {...form.register(`portfolio.${index}.role`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`portfolio.${index}.link`}
                className='text-xs font-normal text-gray-500'
              >
                Link
              </FormLabel>
              <Input
                placeholder='link'
                {...form.register(`portfolio.${index}.link`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`portfolio.${index}.description`}
                className='text-xs font-normal text-gray-500'
              >
                Description
              </FormLabel>
              <Textarea
                placeholder='description'
                {...form.register(`portfolio.${index}.description`)}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <FormLabel
                  htmlFor={`portfolio.${index}.start_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  Start Date
                </FormLabel>
                <InputDate
                  name={`portfolio.${index}.start_date`}
                  control={form.control}
                  handleSelect={handleDateSelect}
                  index={index}
                />
              </div>
              <div>
                <FormLabel
                  htmlFor={`portfolio.${index}.end_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  End Date
                </FormLabel>
                <InputDate
                  name={`portfolio.${index}.end_date`}
                  control={form.control}
                  handleSelect={handleDateSelect}
                  index={index}
                  type='end_date'
                />
              </div>
            </div>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='inline-block w-fit'
              onClick={() => remove(index)}
            >
              <span className='text-xs'>Remove</span>
            </Button>
          </div>
        ))}
      </form>
    </Form>
  )
}

export function StyleForm() {
  const [resume, setResume] = useAtom(resumeAtom)

  const cvStyles = useMemo(
    () => [
      {
        name: 'Basic',
        active: 1,
        onClick: () => setResume((prev) => ({ ...prev!, design: '1' })),
      },
      {
        name: 'Basic 2',
        active: 2,
        onClick: () => setResume((prev) => ({ ...prev!, design: '2' })),
      },
    ],
    []
  )
  return (
    <div className='flex flex-col gap-2'>
      {cvStyles.map((cv, index) => (
        <Button
          key={index}
          variant={cv.active === Number(resume?.design) ? 'default' : 'outline'}
          onClick={cv.onClick}
        >
          {cv.name}
        </Button>
      ))}
    </div>
  )
}
