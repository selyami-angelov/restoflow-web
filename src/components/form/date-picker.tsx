import Picker from 'react-datepicker'
import bg from 'date-fns/locale/bg'
import { registerLocale } from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  getBillForDate: (date: Date) => void
}

registerLocale('bg', bg)

export const DatePicker = ({ getBillForDate }: Props) => {
  const [startDate, setStartDate] = useState<Date>()

  const handlePickerChange = (date: Date) => {
    setStartDate(date)
    getBillForDate(date)
  }

  return (
    <Picker
      dateFormat="dd/MM/yyy"
      placeholderText="Select date"
      locale={'bg'}
      selected={startDate}
      onChange={handlePickerChange}
    />
  )
}
