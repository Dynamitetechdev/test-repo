"use client"
import AlertMessage from '@/components/utils/alertMessage'
import Invest from './invest/page'
import UseStore from '@/store/UseStore'

export default function Home() {
  const { message } = UseStore()
  return (
    <>
      <AlertMessage message={message} />
      <Invest />
    </>
  )
}
