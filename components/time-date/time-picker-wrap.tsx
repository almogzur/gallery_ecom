
import { DateTimeValidationError, PickerChangeHandlerContext, TimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { TextFieldVariants, useTheme, TextFieldProps } from "@mui/material"
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import ControledHelperText from "@/components/mui-input-wrap/controled-helper-text"
import ControledLabel from "@/components/mui-input-wrap/controled-form-label"

interface TimePickerWrapType {
    label: string
    variant?: TextFieldVariants
    value: string | null
    minDate?: Date
    maxTIme?: Date
    isEroor?: boolean
    onAcceptHendler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHendler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onEroorHndler: (e: DateTimeValidationError, context: dayjs.Dayjs | null) => void
    labelPositioin: "top" | "end"
    MediaQuery?: string
    color?: TextFieldProps['color']
    helpText?: string,
    disablePast?: boolean
    helpTextPotionsEnd?: boolean
}

const TimePickerWrap = ({
    label,
    labelPositioin,
    variant,
    value,
    MediaQuery,
    color,
    helpText,
    helpTextPotionsEnd,
    onAcceptHendler,
    onEroorHndler,
    onChangeHendler,
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
            // tryed not working curenntly
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}
            onError={onEroorHndler}
            label={<ControledLabel labelPositioin={labelPositioin} label={label} />}
            sx={{ m: 0.5 }}
            onAccept={onAcceptHendler}
            onChange={onChangeHendler}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
            }}
            slotProps={{
                textField: {
                    variant: variant ?? "outlined",
                    color: color,
                    helperText: helpText ? <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd ?? false} /> : undefined
                }
            }}
        />

    )
}




export default TimePickerWrap