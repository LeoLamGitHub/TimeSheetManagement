/* eslint-disable eqeqeq */
import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './TimesheetColumns'
import Select from 'react-select'

function TimeSheetTable(props) {
  const [week, setWeek] = useState(props.week)
  useEffect(() => {
    setWeek(props.week)
  }, [])
  const initialStartime = []
  week.forEach((w) => initialStartime.push(parseInt(w.startTime)))
  console.log(initialStartime)

  const initialEndTime = []
  week.forEach((w) => initialEndTime.push(parseInt(w.endTime)))
  console.log(initialEndTime)

  const [startTime, setStartTime] = useState([...initialStartime])
  const [endTime, setEndTime] = useState([...initialEndTime])

  const handleOnStartTime = (e, i) => {
    console.log(e.value, 'index', i)
    const newStartTime = [...startTime]
    newStartTime[i] = e.value
    setStartTime([...newStartTime])
    const currWeek = [...week]
    currWeek.splice(i, 1, { ...week[i], startTime: e.value.toString() })
    // console.log('currWeek', currWeek)
    setWeek([...currWeek])
    // setWeek({ ...week, startTime: e.value })
  }
  const handleOnEndTime = (e, i) => {
    console.log(e.value, 'index', i)
    const newEndTime = [...endTime]
    newEndTime[i] = e.value
    setEndTime([...newEndTime])
    const currWeek = [...week]
    currWeek.splice(i, 1, { ...week[i], endTime: e.value.toString() })
    // console.log('currWeek', currWeek)
    setWeek([...currWeek])
  }

  console.log('week', week)

  const timeOptions = [
    { label: 'NA', value: null },
    { label: '9:00AM', value: 9 },
    { label: '10:00AM', value: 10 },
    { label: '11:00AM', value: 11 },
    { label: '12:00PM', value: 12 },
    { label: '1:00PM', value: 13 },
    { label: '2:00PM', value: 14 },
    { label: '3:00PM', value: 15 },
    { label: '4:00PM', value: 16 },
    { label: '5:00PM', value: 17 },
    { label: '6:00PM', value: 18 },
  ]

  console.log(props.week)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Starting Time</th>
            <th>Ending Time</th>
            <th>Total Hours</th>
            <th>Floating Day</th>
            <th>Holiday</th>
            <th>Vacation</th>
          </tr>
        </thead>
        <tbody>
          {week.map((element, i) => {
            return (
              <tr key={i}>
                {/* <>
                  {console.log(
                    timeOptions.filter((t) => t.value == week[i].startTime)
                  )}
                </> */}
                <td>{props.week[i].day}</td>
                <td>{props.week[i].date}</td>
                <td>
                  {props.week[i].day === 'Sunday' ||
                  props.week[i].day === 'Saturday' ? (
                    <Select
                      options={timeOptions}
                      defaultValue={timeOptions[0]}
                      isDisabled
                    />
                  ) : (
                    <Select
                      options={timeOptions}
                      defaultValue={timeOptions.filter(
                        (t) => t.value == week[i].startTime
                      )}
                      onChange={(e) => handleOnStartTime(e, i)}
                    />
                  )}
                </td>
                <td>
                  {props.week[i].day === 'Sunday' ||
                  props.week[i].day === 'Saturday' ? (
                    <Select
                      options={timeOptions}
                      defaultValue={timeOptions[0]}
                      isDisabled
                    />
                  ) : (
                    <Select
                      options={timeOptions}
                      onChange={(e) => handleOnEndTime(e, i)}
                      defaultValue={timeOptions.filter(
                        (t) => t.value == week[i].endTime
                      )}
                    />
                  )}
                </td>
                <td>
                  {props.week[i].day === 'Sunday' ||
                  props.week[i].day === 'Saturday'
                    ? 'NA'
                    : endTime[i] > startTime[i]
                    ? endTime[i] - startTime[i]
                    : 0}
                </td>
                <td>{props.week[i].day}</td>
                <td>{props.week[i].day}</td>
                <td>{props.week[i].day}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// function TimeSheetTable(props) {
//   const data = props.week
//   console.log('Days:', data)
//   const columns = useMemo(() => COLUMNS, [])
//   const tableIns = useTable({ columns, data })
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     tableIns
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th {...column.getHeaderProps()}>{column.render('Header')} </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }

export default TimeSheetTable
