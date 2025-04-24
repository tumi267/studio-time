'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import PageEditor from '../components/admin/PageEditor'


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('content')

  const pages = [
    { id: 'landing', name: 'Landing Page' },
    {id: 'studio', name: 'Studio'},
    { id: 'about', name: 'About Studio' },
    { id: 'client', name: 'Client Page' },
   
    { id: 'contact', name: 'Contact Page' },
    { id: 'gallery', name: 'Gallery Page' }
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Studio Time Admin</h1>
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
        <TabsTrigger value="media" onClick={() => setActiveTab('Booking')}>
            Manage booking
          </TabsTrigger>
          <TabsTrigger value="content" onClick={() => setActiveTab('content')}>
            Content Management
          </TabsTrigger>

        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Edit Page Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <PageEditor 
                    key={page.id}
                    pageId={page.id}
                    pageName={page.name}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {/* booking content here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}