export interface Order {
    referenceNumber: number
    picupCompanyName: string
    picupContactPersonName: string
    picupBusinessMainNumber: number
    picupMobileNumber: number
    picupEmail: string
    picupAddress: string
    picupRemark: string
    addressStatus: string
    dropupCompanyName: string
    dropupStreetAddress: string
    dropupAddress2: string
    dropupCity: number
    dropupState: string
    dropupPostalCode: string
    internalComments: string
    driverInstruction: string
    regularSized: number
    overSized: number
    scheduleStatus: string
    orderDate: Date
    orderStatus: string
}
