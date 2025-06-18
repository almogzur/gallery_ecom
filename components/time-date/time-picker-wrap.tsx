
import { DateTimeValidationError, PickerChangeHandlerContext, TimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { TextFieldVariants, useTheme, TextFieldProps } from "@mui/material"
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import ControlledHelperText from "@/components/mui-input-wrap/controlled-helper-text"
import ControlledLabel from "@/components/mui-input-wrap/controlled-form-label"

interface TimePickerWrapType {
    label: string
    variant?: TextFieldVariants
    value: string | null
    minDate?: Date
    maxTIme?: Date
    isError?: boolean
    onAcceptHandler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHandler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onErrorHandler: (e: DateTimeValidationError, context: dayjs.Dayjs | null) => void
    labelPosition: "top" | "end"
    MediaQuery?: string
    color?: TextFieldProps['color']
    helpText?: string,
    disablePast?: boolean
    helpTextPotionsEnd?: boolean
}

const TimePickerWrap = ({
    label,
    labelPosition,
    variant,
    value,
    MediaQuery,
    color,
    helpText,
    helpTextPotionsEnd,
    onAcceptHandler,
    onChangeHandler,
    onErrorHandler,
    ...restPros
}: TimePickerWrapType) => {

    const theme = useTheme()

    const {} = restPros

    return (

        <TimePicker
            orientation='portrait'

            desktopModeMediaQuery={MediaQuery ?? theme.breakpoints.up("md")}
            value={value ? dayjs(value, 'HH:mm') : null}
            closeOnSelect={false}
            // tried not working currently
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}
            onError={onErrorHandler}
            label={<ControlledLabel labelPosition={labelPosition} label={label} />}
            sx={{ m: 0.5 }}
            onAccept={onAcceptHandler}
            onChange={onChangeHandler}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
            }}
            slotProps={{
                textField: {
                    variant: variant ?? "outlined",
                    color: color,
                    helperText: helpText ? 
                        <ControlledHelperText 
                            text={helpText}
                            helpTextPotionsEnd={helpTextPotionsEnd ?? false}
                             />
                         : undefined
                }
            }}
        />

    )
}




export default TimePickerWrap