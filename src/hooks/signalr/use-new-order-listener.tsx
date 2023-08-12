import { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr'
import { stage } from '../../configs/stage'

export const useNewOrderListener = () => {
  const [newOrder, setNewOrder] = useState(null)

  useEffect(() => {
    const url = stage.replace('/api', '/orderHub')
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build()

    hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected')
        hubConnection.on('NewOrderCreated', (newOrderData) => {
          setNewOrder(newOrderData)
        })
      })
      .catch((err) => console.error('Error while establishing SignalR connection:', err))

    return () => {
      hubConnection.stop()
    }
  }, [])

  return newOrder
}
