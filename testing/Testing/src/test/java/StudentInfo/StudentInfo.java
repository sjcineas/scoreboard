package StudentInfo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class StudentInfo {
    WebDriver driver;

    @BeforeClass
    void setup(){
        driver= new ChromeDriver();
        this.driver.manage().window().maximize();
        this.driver.get("http://localhost:3000/");
    }
    @Test
    void CheckPageLoaded(){
        try {
            Thread.sleep(3000);
            WebElement studentName= driver.findElement(By.linkText("Isabella Chowdhury"));
            studentName.click();
            Thread.sleep(3000);
            boolean noData= driver.findElements(By.id("no data")).size() >0;
            boolean tableFound = driver.findElements(By.id("Event Table")).size() >0;
            if(tableFound){
                System.out.println("Table found");
                WebElement banner= driver.findElement(By.id("banner"));
                WebElement nsbeLogo= banner.findElement(By.id("nsbe_logo"));
                WebElement PageTitle= banner.findElement(By.id("page_title"));
                //validation for banner
                Assert.assertTrue(nsbeLogo.isDisplayed());
                Assert.assertEquals(PageTitle.getText(),"Student Information");
                //Check table and if it has three columns
                WebElement eventsTable= driver.findElement(By.id("Event Table"));
                Assert.assertEquals(eventsTable.getText(),"Event Name");
                Assert.assertEquals(eventsTable.getText(),"Event Type");
                Assert.assertEquals(eventsTable.getText(),"Event Value");



            } else if (noData) {
                System.out.println("No data");
            }


        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

}
