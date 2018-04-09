import * as React from 'react'

import { Label } from '../controls/Label'
import { Plot2D } from '../controls/Plot2D'
import { Slider } from '../controls/Slider'
import { Textbox } from '../controls/Textbox'
import { Await, Props as AwaitProps } from '../utility/Await'
import styled from '../utility/styled'
import { Data } from './data'

// TODO remove in TS 2.9
type AwaitData = new (p: AwaitProps<Data>) => Await<Data>
const AwaitData = Await as AwaitData

interface State {
  selectedImage: number
}

export class Page extends React.Component {
  data = import('./data').then(m => m.DATA)

  state = {
    selectedImage: 1,
  }

  render() {
    return (
      <Wrapper>
        <AwaitData source={this.data}>
          {data => (
            <React.Fragment>
              <Plot2D
                data={data.inputs[this.state.selectedImage - 1]}
                inverted
              />
              <Label text="Image:">
                <Textbox
                  onChange={this.handleSelectedImageTextboxChange}
                  value={this.state.selectedImage.toString()}
                  waitForBlurOrEnter
                />
                <Slider
                  min={1}
                  max={data.inputs.length}
                  onChange={this.handleSelectedImageSliderChange}
                  value={this.state.selectedImage}
                />
              </Label>
            </React.Fragment>
          )}
        </AwaitData>
      </Wrapper>
    )
  }

  handleSelectedImageTextboxChange = (selectedImageText: string) => {
    let selectedImage = +selectedImageText || 1
    if (selectedImage < 1) selectedImage = 1
    if (selectedImage > 2790) selectedImage = 2790 // TODO ):
    this.setState({ selectedImage })
  }

  handleSelectedImageSliderChange = (selectedImage: number) => {
    this.setState({ selectedImage })
  }
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
`
