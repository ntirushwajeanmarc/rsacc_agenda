import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

interface ExcelData {
  sheetName: string
  data: any[][]
}

function App() {
  const [excelData, setExcelData] = useState<ExcelData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadExcelFile()
  }, [])

  const loadExcelFile = async () => {
    setLoading(true)
    try {
      const response = await fetch('/RACCC 2025 Conference Agenda.xlsx')
      const arrayBuffer = await response.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      
      const sheets: ExcelData[] = workbook.SheetNames.map(sheetName => {
        const worksheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
        return { sheetName, data }
      })
      
      setExcelData(sheets)
    } catch (error) {
      console.error('Error loading Excel file:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>RACCC 2025 Conference Agenda</h1>
      </header>

      <main className="content">
        <div className="document-section">
          <h2 className="section-title">Conference Agenda Overview</h2>
          <p className="section-subtitle">6th Rwanda Anesthesia and Critical Care Conference - Quick Reference</p>
          
          <div className="agenda-content">
            <table className="agenda-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Plenary Room</th>
                  <th>Oxygen Room (CCM)</th>
                  <th>Propofol Room (Anesthesia)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="day-header">
                  <td colSpan={4}><strong>Day 1 – October 09</strong></td>
                </tr>
                <tr>
                  <td>08:30</td>
                  <td colSpan={3}>Registration</td>
                </tr>
                <tr>
                  <td>09:00</td>
                  <td colSpan={3}>
                    Lecture on Oxygen and Oxygen Support<br />
                    (Prof Twagirumugabe & Prof Tobi KU)<br />
                    (Dr Mukwesi Christian)
                  </td>
                </tr>
                <tr>
                  <td>10:30</td>
                  <td colSpan={3}>Coffee Break & Exhibition</td>
                </tr>
                <tr>
                  <td>11:00</td>
                  <td colSpan={3}>
                    Opening Ceremony<br />
                    (RSACC with Guests of Honor)
                  </td>
                </tr>
                <tr>
                  <td>12:30</td>
                  <td colSpan={3}>Lunch Break</td>
                </tr>
                <tr>
                  <td>13:30</td>
                  <td>
                    Why Mothers are still dying?<br />
                    (Eugene)
                  </td>
                  <td>
                    WFICC and SCCM Session<br />
                    (Dawit)
                  </td>
                  <td>
                    ERAS Building Capacity<br />
                    (Aderonke)
                  </td>
                </tr>
                <tr>
                  <td>15:00</td>
                  <td>
                    Cardiology, Cardiac Anesthesia and Critical Care<br />
                    (David)
                  </td>
                  <td>
                    Critical Care Training in LRC (Case of Rwanda)<br />
                    (Tobi, Mukwesi, Libere)
                  </td>
                  <td>
                    Safe Pediatrics: Emergencies, Anesthesia & Critical Care<br />
                    (Francoise)
                  </td>
                </tr>
                <tr>
                  <td>16:30</td>
                  <td colSpan={3}>Recap, Refreshment and Networking</td>
                </tr>

                <tr className="day-header">
                  <td colSpan={4}><strong>Day 2 – October 10</strong></td>
                </tr>
                <tr>
                  <td>09:00</td>
                  <td>
                    Global Anesthesia & Surgery<br />
                    (Rosemary)
                  </td>
                  <td>
                    IP-EMACC Interprofessional Emergency and Critical Care Training Curriculum<br />
                    (Matthias)
                  </td>
                  <td>
                    Local Regional Anesthesia & Pain Management<br />
                    (Kaino)
                  </td>
                </tr>
                <tr>
                  <td>10:30</td>
                  <td colSpan={3}>Coffee Break & Exhibition + Networking + Abstract Viewing</td>
                </tr>
                <tr>
                  <td>11:00</td>
                  <td colSpan={3}>
                    4 × 4 Strategy for Timely Access to Safe & Affordable Services: Perioperative, Anesthesia, Pain Management & Critical Care<br />
                    RSACC with MoH (HWD)
                  </td>
                </tr>
                <tr>
                  <td>12:30</td>
                  <td colSpan={3}>Lunch Break + Posters</td>
                </tr>
                <tr>
                  <td>13:30</td>
                  <td>
                    Strategic Plan for CCM in Rwanda<br />
                    (Christian)
                  </td>
                  <td>
                    Nursing Critical Care Workforce<br />
                    (Placide)
                  </td>
                  <td>
                    Toward NSOAP<br />
                    (Francoise)
                  </td>
                </tr>
                <tr>
                  <td>15:00</td>
                  <td colSpan={3}>Best Abstracts</td>
                </tr>
                <tr>
                  <td>16:30</td>
                  <td colSpan={3}>Recap, Refreshment and Networking</td>
                </tr>
                <tr>
                  <td>17:00</td>
                  <td colSpan={3}>Closing Ceremony: Rwanda Action Statement</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="download-section">
            <a href="/CONFERENCE AGENDA.pdf" download className="download-btn">
              📄 Download PDF Version
            </a>
          </div>
        </div>

        <div className="excel-section">
          <h2 className="section-title">Detailed Conference Agenda</h2>
          <p className="section-subtitle">Complete agenda with comprehensive session details and information</p>
          
          {loading ? (
            <div className="loading">Loading Excel data...</div>
          ) : (
            <>
              {excelData.map((sheet, index) => (
                <div key={index} className="sheet-container">
                  <h2 className="sheet-title">{sheet.sheetName}</h2>
                  <div className="table-wrapper">
                    <table className="excel-table">
                      <tbody>
                        {sheet.data.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex === 0 ? 'header-row' : ''}>
                            {row.map((cell, cellIndex) => (
                              rowIndex === 0 ? (
                                <th key={cellIndex}>{cell}</th>
                              ) : (
                                <td key={cellIndex}>{cell}</td>
                              )
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              
              <div className="download-section">
                <a href="/RACCC 2025 Conference Agenda.xlsx" download className="download-btn">
                  📊 Download Excel Version
                </a>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
