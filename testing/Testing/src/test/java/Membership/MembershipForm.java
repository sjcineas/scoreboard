package Membership;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class MembershipForm {
    WebDriver driver;

    @BeforeClass
    void setup(){
        driver=new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/membershipform");
    }
    @Test
    void seedData(){
        WebElement firstName= driver.findElement(By.id("first_name_input"));
        firstName.sendKeys("shawn");
        WebElement lastName= driver.findElement(By.id("last_name_input"));
        lastName.sendKeys("paulin");
        WebElement major= driver.findElement(By.id("major_input"));
        major.sendKeys("CS");
        WebElement pid= driver.findElement(By.id("panther_id_input"));
        pid.sendKeys("6421373");
        WebElement fiuEmail= driver.findElement(By.id("fiu_email_input"));
        fiuEmail.sendKeys("spaul@fiu.edu");
        WebElement personalEmail= driver.findElement(By.id("personal_email_input"));
        personalEmail.sendKeys("spaul@gmail.com");
        WebElement gradSession= driver.findElement(By.id("grad_session_input"));
        gradSession.sendKeys("fall");
        WebElement gradYear= driver.findElement(By.id("grad_year_input"));
        gradYear.sendKeys("2027");
        WebElement phoneNumber= driver.findElement(By.id("phone_number_input"));
        phoneNumber.sendKeys("561-275-4011");
        WebElement schoolStatus= driver.findElement(By.id("senior_label"));
        schoolStatus.click();
        WebElement submit= driver.findElement(By.id("submit_form_label"));
        submit.click();
    }
}
