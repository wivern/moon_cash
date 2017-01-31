FROM golang:1.7.5

ADD . /go/src/github.com/wivern/moon_cash

RUN go get github.com/revel/revel
RUN go get github.com/revel/cmd/revel
RUN go get github.com/jinzhu/gorm

ENTRYPOINT revel run github.com/wivern/moon_cash dev 8080

EXPOSE 8080