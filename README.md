mitm.js - Monitor In The Middle 
==========

`mitm` is a javascript server / service that's easy to use to sit in the middle 
of network services. It was designed initially during a debugging session with 
a wired printer on a mixed wired / wireless network.

mitm configures listening on an incoming port and sending / receiving data 
from that port to a configured host / port configuration. Output is in a hex 
based format and is similar to something you might see in the data section of 
a packet dump.

Examples
---------

A telnet session to an SSH service.

    $ node mitm.js 8080 github.com 22

    Started. Listening on 8080 mitm for github.com:22
    ---------------
    CTRL-C to exit.
    < 00000000  53 53 48 2d 32 2e 30 2d 6c 69 62 73 73 68 2d 30  SSH-2.0-libssh-0
    < 00000010  2e 36 2e 30 0a                                   .6.0.

    > 00000000  0d 0a                                            ..

    < END
    > CLOSED with: false

Google SSL Error

    $ node mitm.js 8080 www.google.com 80

    Started. Listening on 8080 mitm for www.google.com:80
    ---------------
    CTRL-C to exit.
    > 00000000  16 03 01 00 91 01 00 00 8d 03 02 62 62 59 39 42  .........bbY9B
    > 00000010  b7 4c 18 26 63 e6 33 51 32 46 03 dc bd cc ca db  ·L.&cæ3Q2F.Ü½ÌÊÛ
    > 00000020  15 63 1e 5e 66 93 d5 85 41 62 b6 00 00 2a c0 0a  .c.^fÕAb¶..*À.
    > 00000030  c0 09 c0 13 c0 14 c0 12 c0 07 c0 11 00 33 00 32  À.À.À.À.À.À..3.2
    > 00000040  00 45 00 39 00 38 00 88 00 16 00 2f 00 41 00 35  .E.9.8..../.A.5
    > 00000050  00 84 00 0a 00 05 00 04 01 00 00 3a 00 00 00 0e  ..........:....
    > 00000060  00 0c 00 00 09 6c 6f 63 61 6c 68 6f 73 74 ff 01  .....localhostÿ.
    > 00000070  00 01 00 00 0a 00 08 00 06 00 17 00 18 00 19 00  ................
    > 00000080  0b 00 02 01 00 00 23 00 00 33 74 00 00 00 05 00  ......#..3t.....
    > 00000090  05 01 00 00 00 00                                ......

    > 00000000  16 03 01 00 91 01 00 00 8d 03 02 d0 89 b8 33 91  .........Ð¸3
    > 00000010  6e 2e 29 9d dd 38 4a dd aa 6f a3 99 16 a6 62 f7  n.)Ý8JÝªo£.¦b÷
    > 00000020  06 24 49 ae d0 d9 81 c3 f4 79 81 00 00 2a c0 0a  .$I®ÐÙÃôy..*À.
    > 00000030  c0 09 c0 13 c0 14 c0 12 c0 07 c0 11 00 33 00 32  À.À.À.À.À.À..3.2
    > 00000040  00 45 00 39 00 38 00 88 00 16 00 2f 00 41 00 35  .E.9.8..../.A.5
    > 00000050  00 84 00 0a 00 05 00 04 01 00 00 3a 00 00 00 0e  ..........:....
    > 00000060  00 0c 00 00 09 6c 6f 63 61 6c 68 6f 73 74 ff 01  .....localhostÿ.
    > 00000070  00 01 00 00 0a 00 08 00 06 00 17 00 18 00 19 00  ................
    > 00000080  0b 00 02 01 00 00 23 00 00 33 74 00 00 00 05 00  ......#..3t.....
    > 00000090  05 01 00 00 00 00                                ......

    < 00000000  48 54 54 50 2f 31 2e 30 20 34 30 30 20 42 61 64  HTTP/1.0 400 Bad
    < 00000010  20 52 65 71 75 65 73 74 0d 0a 43 6f 6e 74 65 6e   Request..Conten
    < 00000020  74 2d 4c 65 6e 67 74 68 3a 20 35 34 0d 0a 43 6f  t-Length: 54..Co
    < 00000030  6e 74 65 6e 74 2d 54 79 70 65 3a 20 74 65 78 74  ntent-Type: text
    < 00000040  2f 68 74 6d 6c 3b 20 63 68 61 72 73 65 74 3d 55  /html; charset=U
    < 00000050  54 46 2d 38 0d 0a 44 61 74 65 3a 20 54 75 65 2c  TF-8..Date: Tue,
    < 00000060  20 31 30 20 4a 75 6e 20 32 30 31 34 20 32 31 3a   10 Jun 2014 21:
    < 00000070  33 33 3a 33 34 20 47 4d 54 0d 0a 53 65 72 76 65  33:34 GMT..Serve
    < 00000080  72 3a 20 47 46 45 2f 32 2e 30 0d 0a 0d 0a 3c 68  r: GFE/2.0....<h
    < 00000090  74 6d 6c 3e 3c 74 69 74 6c 65 3e 45 72 72 6f 72  tml><title>Error
    < 000000A0  20 34 30 30 20 28 42 61 64 20 52 65 71 75 65 73   400 (Bad Reques
    < 000000B0  74 29 21 21 31 3c 2f 74 69 74 6c 65 3e 3c 2f 68  t)!!1</title></h
    < 000000C0  74 6d 6c 3e                                      tml>

    < END
    < Client ERROR: This socket has been ended by the other party
    > 00000000  15 03 02 00 02 02 0a                             .......

    > Server ERROR: read ECONNRESET
    < 00000000  48 54 54 50 2f 31 2e 30 20 34 30 30 20 42 61 64  HTTP/1.0 400 Bad
    < 00000010  20 52 65 71 75 65 73 74 0d 0a 43 6f 6e 74 65 6e   Request..Conten
    < 00000020  74 2d 4c 65 6e 67 74 68 3a 20 35 34 0d 0a 43 6f  t-Length: 54..Co
    < 00000030  6e 74 65 6e 74 2d 54 79 70 65 3a 20 74 65 78 74  ntent-Type: text
    < 00000040  2f 68 74 6d 6c 3b 20 63 68 61 72 73 65 74 3d 55  /html; charset=U
    < 00000050  54 46 2d 38 0d 0a 44 61 74 65 3a 20 54 75 65 2c  TF-8..Date: Tue,
    < 00000060  20 31 30 20 4a 75 6e 20 32 30 31 34 20 32 31 3a   10 Jun 2014 21:
    < 00000070  33 33 3a 33 34 20 47 4d 54 0d 0a 53 65 72 76 65  33:34 GMT..Serve
    < 00000080  72 3a 20 47 46 45 2f 32 2e 30 0d 0a 0d 0a 3c 68  r: GFE/2.0....<h
    < 00000090  74 6d 6c 3e 3c 74 69 74 6c 65 3e 45 72 72 6f 72  tml><title>Error
    < 000000A0  20 34 30 30 20 28 42 61 64 20 52 65 71 75 65 73   400 (Bad Reques
    < 000000B0  74 29 21 21 31 3c 2f 74 69 74 6c 65 3e 3c 2f 68  t)!!1</title></h
    < 000000C0  74 6d 6c 3e                                      tml>

    > CLOSED with: true
    < END
    < Client ERROR: This socket has been ended by the other party
    > 00000000  15 03 02 00 02 02 0a                             .......

    > Server ERROR: read ECONNRESET
    > CLOSED with: true
