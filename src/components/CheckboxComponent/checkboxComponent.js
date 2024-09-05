import { Checkbox } from "../ui/checkbox"

const CheckboxComponent = (props) => {
  return (
    <div className="flex space-x-2 items-center w-[100px]">
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
