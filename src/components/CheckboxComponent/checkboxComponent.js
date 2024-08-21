import { Checkbox } from "../ui/checkbox"

const CheckboxComponent = (props) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={props.text}
      onCheckedChange={props.onCheckedChange}
        checked={props.checked}
      />
      <label
        htmlFor={props.text}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.text}
      </label>
    </div>
  )
}

export default CheckboxComponent
