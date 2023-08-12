import { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr'
import { stage } from '../../configs/stage'

export const useOrderHubListener = (listenOn: string) => {
  const [newOrder, setNewOrder] = useState(null)

  useEffect(() => {
    if (!listenOn) {
      return
    }

    const url = stage.replace('/api', '/orderHub')
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build()

    //NewOrderCreated
    hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected')
        hubConnection.on(listenOn, (newOrderData) => {
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
