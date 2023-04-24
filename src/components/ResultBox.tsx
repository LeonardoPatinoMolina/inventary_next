import React, { ReactNode } from "react"

interface ResultBoxProps {
  children: any;
  data: any;
}

export const ResultBox: React.FC<ResultBoxProps> = ({ children, data})=>{
  return (
    <section className="resultbox">
      <table className="resultbox__table">
        <thead className="resultbox__table__head">
          <tr>
            <th colSpan={6}>Resultados de búsqueda: {children ? children.length : 0}</th>
          </tr>
        </thead>
        <tbody className="resultbox__table__body">
          {children}
        </tbody>
      </table>
    </section>
  )
}