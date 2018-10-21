// For interest rate up to 10% starting at 5%
for (var interest_rate = 5; interest_rate <= 10; interest_rate++) {
    document.write("<table><tr><th>Year</th><th>Amount on deposit</th><th>Interest Rate</th></tr>");

    // For every interest rate %,  display up to 10 years
    for (var n = 1; n <= 10; n++){
        var A = 0;
        A = 1000*(Math.pow(1 + interest_rate/100, n)); //Formula === A=P(1+r)^n
        A = A.toFixed(2);
        document.write("<tr> <td>"+n+"</td> <td>"+A+"</td> <td>"+interest_rate/100+"</td> </tr>");
    }
    document.write("</table>");
}