package model

type StatusEnum string

const (
	Waiting    StatusEnum = "waiting"
	Processing StatusEnum = "processing"
	Completed  StatusEnum = "completed"
)
