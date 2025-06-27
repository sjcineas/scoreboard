package Membership;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class MembershipForm {
    WebDriver driver;

    @BeforeClass
    void setup(){
        driver=new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/");
    }
    @Test
    void CheckPageLoaded(){

        try {
            Thread.sleep(3000);
            //retrieve elements
            WebElement pageTitle = driver.findElement(By.id("page_title"));
            Assert.assertEquals(pageTitle.getText(), "Member Stat Sheet");
            WebElement nameHeader = driver.findElement(By.id("name_header"));
            WebElement idHeader = driver.findElement(By.id("id_header"));
            WebElement pointsHeader = driver.findElement(By.id("points_header"));
            //Validation
            Assert.assertEquals(nameHeader.getText(), "Name");
            Assert.assertEquals(idHeader.getText(), "Id");
            Assert.assertEquals(pointsHeader.getText(), "Points");


        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
