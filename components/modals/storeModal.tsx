"use client"

import * as z from 'zod'
import { useStoreModal } from "@/hooks/useStoreModal"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from "@/components/ui/modal"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)
            console.log(values)
            const response = await axios.post('/api/stores', values)
            console.log(response.data)
        }catch(err) {
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return (
        <Modal title="Create Store" isOpen={true} onClose={storeModal.onClose}
            description="Add a new store to manage products and categories">
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <Label>Name</Label>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="E-commerce" {...field} />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />
                            <div className="pt-6 space-x-2 items-center justify-end 2-full">
                                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}