function createPopulation(n) {
  var population = [];
  for(let i = 0; i<n; i++) {
    current = [];
    for(let j=0; j<10;j++) {
      current.push(Math.floor(Math.random() * Math.floor(4)));
    }
    population.push(current);
  }
  return population;
}

function calculateFitnessValue(chromosome, world) {
  fitnessValue = 0;
  x = 0;
  y = 0;
  for(let i =0; i<chromosome.length; i++) {
    // 0 = up 1 = down 2 = left  3 = right
    switch(chromosome[i]) {
      case 0 :
        x -=1;
        break;
      case 1:
        x +=1;
        break;
      case 2:
        y -=1;
        break;
      case 3: 
        y +=1;
        break;
    }
    if(world[x] == undefined || world[x][y] == undefined) {
      fitnessValue -=100;
      x = 0;
      y = 0;
    } else {
      fitnessValue += world[x][y];
    }
  }
  return fitnessValue;
}

function crossOver(chromosome1, chromosome2) {
  newChromosome = [];
  for(let i=0; i<chromosome1.length;i++) {
    if(Math.random() < 0.5) {
      newChromosome.push(chromosome1[i]);
    } else {
      newChromosome.push(chromosome2[i]);
    }
  }
  return newChromosome;
}

function mutate(chromosome, p) {
  mutatedChromosome = [];
  for(let i=0; i<chromosome.length; i++) {
    if(Math.random() < p) {
      mutatedChromosome.push(Math.floor(Math.random() * 3));
    } else {
      mutatedChromosome.push(chromosome[i]);
    }
  }
  return mutatedChromosome;
}

function selectFittest(population, world, n) {
  return population.sort((a,b) => calculateFitnessValue(b, world)-calculateFitnessValue(a, world)).slice(0,n);
}

function reproduce(selectedChromosomes, n) {
  newPopulation = [];
  s = selectedChromosomes.length;
  for(let i=0; i<n;i++) {
    newChromosome = crossOver(selectedChromosomes[Math.floor(Math.random() * s)], selectedChromosomes[Math.floor(Math.random() * s)]);
    newPopulation.push(newChromosome);
  } 
  return newPopulation;
}



pop = createPopulation(400);
world = [[-1,-1,-1,-1,-1,1000], [-1,-1,-1,-1,-1,-1], [-1,-1,0,1,1,1]];
for(let iter=1; iter<300;iter++) {
  for(let i=0; i<pop.length;i++) {
    pop[i] = mutate(pop[i], 0.8/iter);
  }
  pop = reproduce(selectFittest(pop, world, 10), 100);
}

popf = {};
for(let i=0; i<pop.length; i++) {
  popf[pop[i]] = calculateFitnessValue(pop[i], world);
}
console.log(popf);
console.log(world);

//calculateFitnessValue(createPopulation(100)[0], world);