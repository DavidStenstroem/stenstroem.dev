import * as React from 'react'
import { v4 } from 'uuid'

/*

1 column:  -> 720px
2 columns: -> 960px
3 columns: -> 1344px

*/

interface Props {
  width: number
  mobileColumns?: number
  tabletColumns?: number
  desktopColumns?: number
  fullHDColumns?: number
  gap?: number
  children: React.ReactChild[]
}

export const ImageLayout: React.FC<Props> = ({
  width,
  gap = 20,
  children,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  fullHDColumns = 4,
}): JSX.Element => {
  const columnWrapper: { [key: string]: any } = {}
  const result = []

  const columns = (
    width: number,
    mobileColumns: number,
    tabletColumns: number,
    desktopColumns: number,
    fullHDColumns: number
  ): number => {
    if (width <= 720) {
      return mobileColumns
    } else if (width > 720 && width <= 960) {
      return tabletColumns
    } else if (width > 960 && width <= 1344) {
      return desktopColumns
    } else {
      return fullHDColumns
    }
  }

  for (
    let i = 0;
    i <
    columns(width, mobileColumns, tabletColumns, desktopColumns, fullHDColumns);
    i++
  ) {
    columnWrapper[`column${i}`] = []
  }

  for (let i = 0; i < children.length; i++) {
    const columnIndex =
      i %
      columns(
        width,
        mobileColumns,
        tabletColumns,
        desktopColumns,
        fullHDColumns
      )
    console.log('pushing child')
    columnWrapper[`column${columnIndex}`].push(
      <div key={v4()} style={{ marginBottom: `${gap}px` }}>
        {children[i]}
      </div>
    )
  }

  for (
    let i = 0;
    i <
    columns(width, mobileColumns, tabletColumns, desktopColumns, fullHDColumns);
    i++
  ) {
    result.push(
      <div key={v4()} style={{ marginLeft: `${i > 0 ? gap : 0}px`, flex: 1 }}>
        {columnWrapper[`column${i}`]}
      </div>
    )
  }

  return (
    <div className="imagelayout" style={{ display: 'flex' }}>
      {result}
    </div>
  )
}
